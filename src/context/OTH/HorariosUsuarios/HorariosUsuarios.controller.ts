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
import { CompartirHorario, HorariosUsuarios } from './HorariosUsuarios.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
} from 'src/constants/constants';

@ApiTags('HorariosUsuarios')
@ApiBearerAuth()
@Controller('HorariosUsuarios')
export class HorariosUsuariosController {
  constructor(private readonly service: HorariosUsuariosService) {}

  @Get('/paginated/:page/:itemsPerPage')
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getPaginated(
    @Param('page') page: number,
    @Param('itemsPerPage') itemsPerPage: number,
    @Req() request: Request, @JWT() req
  ) {
    const idUser = req.user.idUser;
    page = Number(page);
    itemsPerPage = Number(itemsPerPage);
    return this.service.getPaginatedByUser(
      page,
      itemsPerPage,
      request.query.includeDeleted === 'true',
      idUser
    );
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
    return this.service.delete(Number(id));
  }

  @Post('/share')
  async share(@Body() data: CompartirHorario, @JWT() req ) {
    const idUser = req.user.idUser;
    return this.service.convertHorarioToPublic(Number(data.horario_id), idUser, data.url);
  }
}
