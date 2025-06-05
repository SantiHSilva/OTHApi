import { Module } from '@nestjs/common';
import { MateriasController } from './Materias.controller';
import { MateriasService } from './Materias.service';

@Module({
  controllers: [MateriasController],
  providers: [MateriasService],
})
export class MateriasModule {}
