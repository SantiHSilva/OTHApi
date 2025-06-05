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
import { DetallesMateriasService } from './DetallesMaterias.service';
import { DetallesMaterias } from './DetallesMaterias.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
} from 'src/constants/constants';

@ApiTags('DetallesMaterias')
@ApiBearerAuth()
@Controller('DetallesMaterias')
export class DetallesMateriasController {
  constructor(private readonly service: DetallesMateriasService) {}

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
  async create(@Body() data: DetallesMaterias) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: DetallesMaterias) {
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
