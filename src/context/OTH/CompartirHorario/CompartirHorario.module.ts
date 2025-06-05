import { Module } from '@nestjs/common';
import { CompartirHorarioController } from './CompartirHorario.controller';
import { CompartirHorarioService } from './CompartirHorario.service';

@Module({
  controllers: [CompartirHorarioController],
  providers: [CompartirHorarioService],
})
export class CompartirHorarioModule {}
