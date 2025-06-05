import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class DetallesHorariosMaterias implements Prisma.DetallesHorariosMateriasCreateManyInput {
  @ApiProperty({ example: "NRC: 239482304" })
  descripcion: string;
  @ApiProperty({ example: 0 })
  id_horario_materia: number;
  @ApiProperty({ example: 1 })
  mostrar?: boolean;
  @ApiProperty({ example: 1 })
  orden: number;
}
