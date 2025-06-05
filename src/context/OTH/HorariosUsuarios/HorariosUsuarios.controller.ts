import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request as JWT,
} from '@nestjs/common';
import { HorariosUsuariosService } from './HorariosUsuarios.service';
import { CompartirHorario, Horario, HorariosUsuarios } from './HorariosUsuarios.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
  Public,
} from 'src/constants/constants';

@ApiTags('HorariosUsuarios')
@ApiBearerAuth()
@Controller('HorariosUsuarios')
export class HorariosUsuariosController {
  constructor(private readonly service: HorariosUsuariosService) {}

  @Get('/all')
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getPaginated(
    @Req() request: Request
  ) {
    return this.service.getAll(
      request.query.includeDeleted === 'true',
    );
  }

  @Get('/get/:horarioId')
  async getById(@Param('horarioId') horarioId: string, @JWT() req) {
    const idUser = req.user.idUser;
    return this.service.getDetailsSchedule(Number(horarioId), idUser);
  }

  @Public()
  @Get('/view/:urlPublica')
  async getSchedulePublic(
    @Param('urlPublica') urlPublica: string,
  ) {
    return this.service.getSchedulePublic(urlPublica);
  }

  @Post('/save/:horarioId')
  async saveSchedule(
    @Param('horarioId') horarioId: string,
    @Body() data: Horario[],
    @JWT() req
  ) {
    const idUser = req.user.idUser;
    console.log(data);
    return this.service.saveSchedule(idUser, Number(horarioId), data);
  }

  @Post()
  async create(@Body() data: HorariosUsuarios, @JWT() req) {
    const idUser = req.user.idUser;
    return this.service.createByUser(data, idUser);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: HorariosUsuarios, @JWT() req ) {
    const idUser = req.user.idUser;
    return this.service.updateByUser(Number(id), data, idUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @JWT() req ) {
    const idUser = req.user.idUser;
    return this.service.deleteByUser(Number(id), idUser);
  }

  @Post('/restore/:id')
  async restore(@Param('id') id: string, @JWT() req ) {
    return this.service.restore(Number(id));
  }

  @Post('/share')
  async share(@Body() data: CompartirHorario, @JWT() req ) {
    const idUser = req.user.idUser;
    return this.service.convertHorarioToPublic(Number(data.horario_id), idUser, data.url);
  }
}
