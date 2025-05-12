import { Module } from '@nestjs/common';
import { HorariosUsuariosModule } from './HorariosUsuarios/HorariosUsuarios.module';

@Module({
  imports: [HorariosUsuariosModule],
})
export class OTHModule {}
