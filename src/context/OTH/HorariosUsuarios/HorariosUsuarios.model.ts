import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class HorariosUsuarios implements Prisma.HorariosUsuariosCreateManyInput {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  usuario_id: number;
}

export class CompartirHorario {
  @ApiProperty()
  url: string;

  @ApiProperty()
  horario_id: number;
}