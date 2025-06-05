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
import { CompartirHorarioService } from './CompartirHorario.service';
import { CompartirHorario } from './CompartirHorario.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
  Public,
} from 'src/constants/constants';

@ApiTags('CompartirHorario')
@ApiBearerAuth()
@Controller('CompartirHorario')
export class CompartirHorarioController {
  constructor(private readonly service: CompartirHorarioService) {}

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
  async create(@Body() data: CompartirHorario) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CompartirHorario) {
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
