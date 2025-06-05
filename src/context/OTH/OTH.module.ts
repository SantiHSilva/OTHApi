import { Module } from '@nestjs/common';
import { HorariosUsuariosModule } from './HorariosUsuarios/HorariosUsuarios.module';
import { CompartirHorarioModule } from './CompartirHorario/CompartirHorario.module';
import { MateriasModule } from './Materias/Materias.module';
import { DetallesMateriasModule } from './DetallesMaterias/DetallesMaterias.module';
import { HorariosMateriasModule } from './HorariosMaterias/HorariosMaterias.module';

@Module({
  imports: [HorariosUsuariosModule, CompartirHorarioModule, MateriasModule, DetallesMateriasModule, HorariosMateriasModule],
})
export class OTHModule {}
