import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Permisos implements Prisma.PermisosCreateManyInput {
  @ApiProperty({
    example: 1,
    description: 'Referencia al rol asociado a estos permisos.',
  })
  rol_id: number;

  @ApiProperty({
    example: false,
    description: 'Indica si el rol tiene permiso para agregar registros.',
  })
  agregar?: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica si el rol tiene permiso para eliminar registros.',
  })
  eliminar?: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica si el rol tiene permiso para leer registros.',
  })
  leer?: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica si el rol tiene permiso para modificar registros.',
  })
  modificar?: boolean;

  @ApiProperty({
    example: 'tabla',
    description: 'Nombre de la tabla a la que se le asignan los permisos.',
  })
  tabla: string;
}
