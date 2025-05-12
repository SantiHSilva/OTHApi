import { Module } from '@nestjs/common';
import { HorariosUsuariosController } from './HorariosUsuarios.controller';
import { HorariosUsuariosService } from './HorariosUsuarios.service';

@Module({
  controllers: [HorariosUsuariosController],
  providers: [HorariosUsuariosService],
})
export class HorariosUsuariosModule {}
