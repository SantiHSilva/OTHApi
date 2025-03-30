import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OPERATIONS, PERMISSIONS_KEY } from 'src/constants/constants';
import { Request } from 'express';
import { JWTApplicationService } from 'src/context/auth/jwt/jwt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwt: JWTApplicationService,
    private prisma: PrismaService,
  ) {}

  private async getPermissions(idUser: number) {
    return (
      (
        await this.prisma.usuarios.findUnique({
          where: { id: idUser },
          include: {
            Roles: {
              include: {
                Permisos: true,
              },
            },
          },
        })
      ).Roles?.Permisos || []
    );
  }

  private async havePermissions(
    idUser: number,
    requiredPermissions: string[][],
  ): Promise<boolean> {
    const necesaryPermissions = requiredPermissions.map(
      ([tabla, operacion]) => ({ tabla, operacion }),
    );

    const requiredPermissionsNumber = necesaryPermissions.length;
    let requiredPermissionsMatched = 0;

    const permissions = await this.getPermissions(idUser);

    necesaryPermissions.forEach((permiso) => {
      let permisoValido = false;

      for (const p of permissions) {
        if (p.tabla.toLowerCase() !== permiso.tabla.toLowerCase()) {
          continue;
        }

        if (
          (permiso.operacion === OPERATIONS.READ && p.leer) ||
          (permiso.operacion === OPERATIONS.CREATE && p.agregar) ||
          (permiso.operacion === OPERATIONS.UPDATE && p.modificar) ||
          (permiso.operacion === OPERATIONS.DELETE && p.eliminar)
        ) {
          permisoValido = true;
          break; // Salimos del bucle al encontrar el permiso válido
        }
      }

      if (permisoValido) {
        requiredPermissionsMatched++;
      }
    });

    if (requiredPermissionsMatched !== requiredPermissionsNumber) {
      throw new ForbiddenException('No tienes permisos suficientes');
    }

    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[][]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si el recurso no tiene permisos requeridos, se permite el acceso
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    if (await this.jwt.isBlacklisted(token)) {
      throw new UnauthorizedException('Token inhabilitado');
    }

    const idUser = (await this.jwt.decode(token)).idUser;

    if (!this.jwt.verifyToken(token)) {
      throw new UnauthorizedException('Token inválido');
    }

    return await this.havePermissions(idUser, requiredPermissions);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
