import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Departamentos implements Prisma.DepartamentosCreateManyInput {
  @ApiProperty({
    description: 'Codigo del departamento',
    example: '01',
  })
  codigo: string;

  @ApiProperty({
    description: 'Nombre del departamento',
    example: 'Amazonas',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Pais al que pertenece el departamento',
    example: 0,
  })
  pais_id: number;
}
