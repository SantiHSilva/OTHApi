import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MailsService } from '../mails/mail.service';
import {
  Login,
  GoogleAccessToken,
  Register,
  RequestEmailOperation,
  ResetPassword,
  GoogleAccessTokenRegister,
  JWTToken,
  JWTRefresh,
  PropsAccount,
} from './auth.model';

import {
  comparePassword,
  generateRandomPassword,
  hashPassword,
} from 'src/utils/utils';
import { defaultUserRoleName } from 'src/constants/constants';
import { TokenManager } from './auth.strategy';
import { OAuth2Client } from 'google-auth-library';
import { JWTApplicationService } from './jwt/jwt.service';
import { PrismaService } from 'src/prisma/prisma.service';

const webClientID = process.env.WEB_CLIENT_ID_GOOGLE;

const client = new OAuth2Client(webClientID);
const VerifyAccount = new TokenManager();
const PasswordAccount = new TokenManager();

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private mailServivce: MailsService,
    private jwt: JWTApplicationService,
  ) {}

  async refreshAccessToken(refreshToken: JWTRefresh) {
    try {
      const refreshTokenInfo = await this.jwt.decode(refreshToken.refreshToken);

      if (!(await this.jwt.verifyRefreshToken(refreshToken.refreshToken))) {
        throw new UnauthorizedException('Token invalido');
      }

      const user = await this.prisma.usuarios.findUnique({
        where: {
          id: refreshTokenInfo['idUser'],
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const newToken = await this.jwt.generateAccessToken(user.id);

      return {
        newAccessToken: newToken,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al refrescar el token', {
        description: error?.message || error,
      });
    }
  }

  async blackListToken(token: JWTToken) {
    try {
      // Access Token

      const accessTokenInfo = await this.jwt.decode(token.accessToken);

      const expiracion = accessTokenInfo['exp'] * 1000;

      await this.jwt.blacklistToken(token.accessToken, expiracion);

      // Refresh Token

      const refreshTokenInfo = await this.jwt.decode(token.refreshToken);

      const expiracionRefresh = refreshTokenInfo['exp'] * 1000;

      await this.jwt.blacklistToken(token.refreshToken, expiracionRefresh);

      return {
        message: 'Sesion cerrada',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al cerrar sesion', {
        description: error?.message || error,
      });
    }
  }

  async profile(idUser: number) {
    return await this.prisma.usuarios.findUnique({
      where: {
        id: idUser,
      },
      include: {
        Personas: {
          include: {
            Nacionalidad: true,
          },
        },
        Roles: {
          include: {
            Permisos: true,
          },
        },
      },
    });
  }

  async login(data: Login) {
    try {
      const user = await this.prisma.usuarios.findUnique({
        where: {
          correo: data.email,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (!(await comparePassword(data.password, user.password))) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      return this.jwt.generateToken(user.id);
    } catch (error) {
      throw new InternalServerErrorException('Error al iniciar sesion', {
        description: error?.message || error,
      });
    }
  }

  async register(data: Register) {
    data.email = data.email.toLowerCase();
    data.email = data.email.trim();
    data.password = data.password.trim();
    try {
      const usuario = await this.createUser(data);
      return this.jwt.generateToken(usuario.id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Error al registrar usuario', {
        description: error?.message || error,
      });
    }
  }

  async createUser(data: Register) {
    const accountVerified = false;
    let persona_id: number;

    try {
      // Verificar si el correo ya existe
      const user = await this.prisma.usuarios.findUnique({
        where: {
          correo: data.email,
        },
      });

      if (user) {
        throw new ConflictException('Correo ya registrado');
      }
      // Verificar si el rol por defecto existe
      const rol = await this.prisma.roles.findUnique({
        where: {
          id: parseInt(process.env.ROL_ID_POR_DEFECTO),
        },
      });

      if (!rol) {
        await this.prisma.roles.create({
          data: {
            descripcion:
              process.env.ROL_NOMBRE_POR_DEFECTO ?? defaultUserRoleName,
            id: parseInt(process.env.ROL_ID_POR_DEFECTO),
          },
        });
      }

      // // Verificar si el sexo existe
      // const sexo = await this.prisma.sexos.findUnique({
      //   where: {
      //     id: data.sexo,
      //   },
      // });

      // if (!sexo) {
      //   throw new BadRequestException('Sexo no encontrado');
      // }

      // Crear Persona
      const persona = await this.prisma.personas.create({
        data: {
          nombres: data.nombre,
          apellidos: data?.apellido || '',
          sexo: data.sexo,
          nacionalidad_id: data.nacionalidad_id,
          telefono: data.telefono,
          direccion_domicilio: data.direccion_domicilio,
          direccion_notificacion: data.direccion_notificacion,
        },
      });

      persona_id = persona.id;

      // Crear Usuario
      const usuario = await this.prisma.usuarios.create({
        data: {
          correo: data.email,
          password: await hashPassword(data.password),
          persona_id: persona_id,
          rol_id: parseInt(process.env.ROL_ID_POR_DEFECTO),
          verificado: accountVerified,
        },
      });

      return usuario;
    } catch (error) {
      // Eliminar persona si existe
      if (persona_id) {
        await this.prisma.personas.delete({
          where: {
            id: persona_id,
          },
        });
      }

      throw new InternalServerErrorException('Error al registrar usuario', {
        description: error?.message || error,
      });
    }
  }

  async _generateToken(
    data: RequestEmailOperation,
    tokenManager: TokenManager,
  ) {
    try {
      const user = await this.prisma.usuarios.findUnique({
        where: {
          correo: data.email,
        },
        include: {
          Personas: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (await tokenManager.existAccount(user.correo)) {
        throw new ConflictException('Token ya enviado');
      }

      const { token, tokenValidity } = await tokenManager.addAccount(
        user.correo,
      );

      return { token, tokenValidity, user };
    } catch (error) {
      await tokenManager.removeAccount(data.email);
      throw new InternalServerErrorException('Error al generar token', {
        description: error?.message || error,
      });
    }
  }

  async sendResetPassword(
    headers: ParameterDecorator,
    data: RequestEmailOperation,
  ) {
    try {
      const { token, tokenValidity, user } = await this._generateToken(
        data,
        PasswordAccount,
      );

      const paramsToSend: PropsAccount = {
        name: `${user.Personas.nombres} ${user.Personas?.apellidos}`,
        email: user.correo,
        token: {
          token: token,
          expiresIn: tokenValidity,
        },
        redirectUrl: data.redirectTo,
        headers: headers,
      };

      await this.mailServivce.sendResetPassword(paramsToSend);

      return {
        message: 'Correo enviado',
      };
    } catch (error) {
      console.log('sendResetPassword -> error', error);
      await PasswordAccount.removeAccount(data.email);
      throw new InternalServerErrorException('Error al enviar el correo', {
        description: error?.message || error,
      });
    }
  }

  async sendVerificationAccount(
    headers: ParameterDecorator,
    email: RequestEmailOperation,
  ) {
    try {
      const isVerified = await this.prisma.usuarios
        .findUnique({
          where: {
            correo: email.email,
          },
        })
        .then((user) => user?.verificado);

      if (isVerified) {
        throw new ConflictException('Usuario ya verificado');
      }

      const { token, tokenValidity, user } = await this._generateToken(
        email,
        VerifyAccount,
      );

      const paramsToSend: PropsAccount = {
        name: `${user.Personas.nombres} ${user.Personas?.apellidos}`,
        email: user.correo,
        token: {
          token: token,
          expiresIn: tokenValidity,
        },
        redirectUrl: email.redirectTo,
        headers: headers,
      };

      await this.mailServivce.sendVerifyAccount(paramsToSend);

      return {
        message: 'Correo enviado',
      };
    } catch (error) {
      console.log('sendVerificationAccount -> error', error);
      await VerifyAccount.removeAccount(email.email);
      throw new InternalServerErrorException('Error al enviar el correo', {
        description: error?.message || error,
      });
    }
  }

  async verifyAccountWitToken(token: string) {
    try {
      const isTokenValid = await VerifyAccount.verifyAccount(token);

      if (!isTokenValid) {
        throw new UnauthorizedException('Token invalido');
      }

      await this.prisma.usuarios.update({
        where: {
          correo: isTokenValid as string,
        },
        data: {
          verificado: true,
        },
      });

      return {
        message: 'Usuario verificado',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al verificar el token', {
        description: error?.message || error,
      });
    }
  }

  async resetPassword(data: ResetPassword) {
    try {
      const isTokenValid = await PasswordAccount.verifyAccount(data.token);

      if (!isTokenValid) {
        throw new UnauthorizedException('Token invalido');
      }

      await this.prisma.usuarios.update({
        where: {
          correo: isTokenValid as string,
        },
        data: {
          password: await hashPassword(data.newPassword),
        },
      });

      return {
        message: 'Contraseña actualizada',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar la contraseña',
        {
          description: error?.message || error,
        },
      );
    }
  }

  async OAuthGoogle(data: GoogleAccessToken) {
    if (!webClientID) {
      throw new InternalServerErrorException(
        'No se ha configurado el ID de cliente de Google',
      );
    }

    const ticket = await client.verifyIdToken({
      idToken: data.idToken,
      audience: webClientID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new BadRequestException('Invalid token');
    }
    const { sub, email } = payload;

    const googleUser = await this.prisma.oAuthGoogle.findFirst({
      where: {
        google_id: sub,
      },
    });

    if (googleUser) {
      return this.jwt.generateToken(googleUser.usuario_id);
    }

    const user = await this.prisma.usuarios.findFirst({
      where: {
        correo: email,
      },
    });

    if (user) {
      await this.prisma.oAuthGoogle.create({
        data: {
          google_id: sub,
          usuario_id: user.id,
        },
      });

      return this.jwt.generateToken(user.id);
    }

    throw new ConflictException('Usuario no encontrado');
  }

  async OAuthGoogleRegister(data: GoogleAccessTokenRegister) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: data.idToken,
        audience: webClientID,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new BadRequestException('Invalid token');
      }
      const { email, family_name, given_name, sub } = payload;

      if (
        await this.prisma.oAuthGoogle.findFirst({ where: { google_id: sub } })
      ) {
        throw new ConflictException('Usuario ya registrado');
      }

      const user = await this.prisma.usuarios.findFirst({
        where: {
          correo: email,
        },
      });

      // si ya hay usuario registrado con ese correo
      if (user) {
        await this.prisma.oAuthGoogle.create({
          data: {
            google_id: sub,
            usuario_id: user.id,
          },
        });

        return this.jwt.generateToken(user.id);
      }

      // Si no hay usuario registrado con ese correo, se crea :3
      const createdUser = await this.createUser({
        email: email,
        nombre: given_name,
        apellido: family_name,
        sexo: data.sexo,
        nacionalidad_id: data.nacionalidad_id,
        telefono: '',
        direccion_domicilio: '',
        direccion_notificacion: '',
        password: generateRandomPassword(Math.floor(Math.random() * 10) + 8), // Generar contraseña aleatoria de 8 a 18 caracteres
      });

      await this.prisma.oAuthGoogle.create({
        data: {
          google_id: sub,
          usuario_id: createdUser.id,
        },
      });

      return this.jwt.generateToken(createdUser.id);
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar usuario', {
        description: error?.message || error,
      });
    }
  }
}
