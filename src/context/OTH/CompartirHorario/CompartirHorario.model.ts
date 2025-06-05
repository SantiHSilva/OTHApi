import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CompartirHorario implements Prisma.CompartirHorarioCreateManyInput {
  @ApiProperty({ example: 1 })
  horario_id: number;
  @ApiProperty({ example: 'UPC-7' })
  url: string;
}
