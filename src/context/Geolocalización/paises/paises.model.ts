import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Paises implements Prisma.PaisesCreateManyInput {
  @ApiProperty({
    example: '170',
    description: 'Código de país según ISO 3166-1 alpha-2.',
  })
  codigo: string;

  @ApiProperty({
    example: 'Colombia',
    description: 'Nombre del país.',
  })
  descripcion: string;
}
