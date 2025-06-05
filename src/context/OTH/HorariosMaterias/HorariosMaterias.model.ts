import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class HorariosMaterias implements Prisma.HorariosMateriasCreateManyInput {
  @ApiProperty({ example: 1 })
  dia: string;
  @ApiProperty({ example: "08:00" })
  hora_fin: string;
  @ApiProperty({ example: "07:00" })
  hora_inicio: string;
  @ApiProperty({ example: 0 })
  id_materia: number;
  @ApiProperty({ example: 1 })
  orden: number;
}
