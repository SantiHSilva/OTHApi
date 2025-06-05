import { Module } from '@nestjs/common';
import { HorariosMateriasController } from './HorariosMaterias.controller';
import { HorariosMateriasService } from './HorariosMaterias.service';

@Module({
  controllers: [HorariosMateriasController],
  providers: [HorariosMateriasService],
})
export class HorariosMateriasModule {}
