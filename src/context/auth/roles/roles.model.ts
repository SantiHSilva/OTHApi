import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Roles implements Prisma.RolesCreateInput {
  @ApiProperty({
    example: 'Usuario',
    description: 'Nombre o descripción del rol (ej. Administrador, Usuario).',
  })
  descripcion: string;
}
