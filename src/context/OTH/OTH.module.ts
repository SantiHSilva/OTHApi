import { Module } from '@nestjs/common';
import { HorariosUsuariosModule } from './HorariosUsuarios/HorariosUsuarios.module';
import { CompartirHorarioModule } from './CompartirHorario/CompartirHorario.module';

@Module({
  imports: [HorariosUsuariosModule, CompartirHorarioModule],
})
export class OTHModule {}
