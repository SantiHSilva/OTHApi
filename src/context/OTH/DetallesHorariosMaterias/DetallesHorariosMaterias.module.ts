import { Module } from '@nestjs/common';
import { DetallesHorariosMateriasController } from './DetallesHorariosMaterias.controller';
import { DetallesHorariosMateriasService } from './DetallesHorariosMaterias.service';

@Module({
  controllers: [DetallesHorariosMateriasController],
  providers: [DetallesHorariosMateriasService],
})
export class DetallesHorariosMateriasModule {}
