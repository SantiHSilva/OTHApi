import { Module } from '@nestjs/common';
import { HorariosUsuariosModule } from './HorariosUsuarios/HorariosUsuarios.module';
import { CompartirHorarioModule } from './CompartirHorario/CompartirHorario.module';
import { MateriasModule } from './Materias/Materias.module';
import { DetallesMateriasModule } from './DetallesMaterias/DetallesMaterias.module';

@Module({
  imports: [HorariosUsuariosModule, CompartirHorarioModule, MateriasModule, DetallesMateriasModule],
})
export class OTHModule {}
