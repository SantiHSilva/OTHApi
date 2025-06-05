import { Module } from '@nestjs/common';
import { HorariosUsuariosModule } from './HorariosUsuarios/HorariosUsuarios.module';
import { CompartirHorarioModule } from './CompartirHorario/CompartirHorario.module';
import { MateriasModule } from './Materias/Materias.module';

@Module({
  imports: [HorariosUsuariosModule, CompartirHorarioModule, MateriasModule],
})
export class OTHModule {}
