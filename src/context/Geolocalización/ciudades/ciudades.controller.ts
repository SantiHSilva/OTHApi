import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { Ciudades } from './ciudades.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
  OPERATIONS,
  RequirePermissions,
  TABLES,
} from 'src/constants/constants';
@ApiTags('Ciudades')
@ApiBearerAuth()
@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly service: CiudadesService) {}

  @RequirePermissions([TABLES.CIUDADES, OPERATIONS.READ])
  @Get('/paginated/:page/:itemsPerPage')
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getPaginated(
    @Param('page') page: number,
    @Param('itemsPerPage') itemsPerPage: number,
    @Req() request: Request,
  ) {
    page = Number(page);
    itemsPerPage = Number(itemsPerPage);
    return this.service.getPaginated(
      page,
      itemsPerPage,
      request.query.includeDeleted === 'true',
    );
  }

  @RequirePermissions([TABLES.CIUDADES, OPERATIONS.READ])
  @Get()
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getAll(@Req() request: Request) {
    return this.service.getAll(request.query.includeDeleted === 'true');
  }

  @RequirePermissions([TABLES.CIUDADES, OPERATIONS.CREATE])
  @Post()
  async create(@Body() data: Ciudades) {
    return this.service.create(data);
  }

  @RequirePermissions([TABLES.CIUDADES, OPERATIONS.READ])
  @Get('get/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }

  @RequirePermissions([TABLES.CIUDADES, OPERATIONS.UPDATE])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Ciudades) {
    return this.service.update(Number(id), data);
  }

  @RequirePermissions([TABLES.CIUDADES, OPERATIONS.DELETE])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
