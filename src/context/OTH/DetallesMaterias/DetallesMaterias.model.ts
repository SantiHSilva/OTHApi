import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class DetallesMaterias implements Prisma.DetallesMateriasCreateManyInput {
  @ApiProperty({ example: "UPC-7" })
  descripcion: string;
  @ApiProperty({ example: 0 })
  id_materia: number;
  @ApiProperty({ example: 1 })
  mostrar?: boolean;
  @ApiProperty({ example: 1 })
  orden: number;
}
