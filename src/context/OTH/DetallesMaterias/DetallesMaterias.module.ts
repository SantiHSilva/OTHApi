import { Module } from '@nestjs/common';
import { DetallesMateriasController } from './DetallesMaterias.controller';
import { DetallesMateriasService } from './DetallesMaterias.service';

@Module({
  controllers: [DetallesMateriasController],
  providers: [DetallesMateriasService],
})
export class DetallesMateriasModule {}
