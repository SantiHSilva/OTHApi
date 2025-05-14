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

export class Horario {
    key:      number;
    name:     string;
    color:    string;
    materias: Materia[];
}

export class Materia {
    descripciones_generales: DescripcionesGenerales[];
    descripciones_por_dia:   DescripcionesPorDia[];
}

export class DescripcionesGenerales {
    mostrar_en_tabla: boolean;
    titulo:           string;
}

export class DescripcionesPorDia {
    dia:     string;
    inicio:  string;
    fin:     string;
    ajustes?: DescripcionesGenerales[];
}