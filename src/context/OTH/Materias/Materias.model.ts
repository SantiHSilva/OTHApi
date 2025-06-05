import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Materias implements Prisma.MateriasCreateManyInput {
  @ApiProperty({ example: "#ffffff" })
  color: string;
  @ApiProperty({ example: "Algebra Lineal" })
  nombre: string;
  @ApiProperty({ example: 0 })
  id_horario: number;
}
