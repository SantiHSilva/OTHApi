import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Usuarios implements Prisma.UsuariosCreateManyInput {
  @ApiProperty({
    description: 'Correo electrónico utilizado para autenticación.',
    example: 'pedro@gonzales.co',
  })
  correo: string;

  @ApiProperty({
    description: 'Contraseña encriptada del usuario.',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    description: 'Referencia a la persona asociada al usuario.',
    example: 0,
  })
  persona_id: number;

  @ApiProperty({
    description: 'Referencia al rol asignado al usuario.',
    example: 0,
  })
  rol_id: number;
}
