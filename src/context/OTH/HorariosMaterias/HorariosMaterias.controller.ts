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
import { HorariosMateriasService } from './HorariosMaterias.service';
import { HorariosMaterias } from './HorariosMaterias.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
} from 'src/constants/constants';

@ApiTags('HorariosMaterias')
@ApiBearerAuth()
@Controller('HorariosMaterias')
export class HorariosMateriasController {
  constructor(private readonly service: HorariosMateriasService) {}

  @Get('/all')
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getPaginated(
    @Req() request: Request
  ) {
    return this.service.getAll(
      request.query.includeDeleted === 'true',
    );
  }

  @Post()
  async create(@Body() data: HorariosMaterias) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: HorariosMaterias) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }

  @Post('/restore/:id')
  async restore(@Param('id') id: string) {
    return this.service.restore(Number(id));
  }
}
