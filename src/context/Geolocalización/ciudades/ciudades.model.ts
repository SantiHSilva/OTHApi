import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Ciudades implements Prisma.CiudadesCreateManyInput {
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
    description: 'Departamento al que pertenece la ciudad',
    example: 0,
  })
  departamento_id: number;
}
