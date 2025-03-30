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
import { DepartamentosService } from './departamentos.service';
import { Departamentos } from './departamentos.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
  OPERATIONS,
  RequirePermissions,
  TABLES,
} from 'src/constants/constants';
@ApiTags('Departamentos')
@ApiBearerAuth()
@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly service: DepartamentosService) {}

  @RequirePermissions([TABLES.DEPARTAMENTOS, OPERATIONS.READ])
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

  @RequirePermissions([TABLES.DEPARTAMENTOS, OPERATIONS.READ])
  @Get()
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getAll(@Req() request: Request) {
    return this.service.getAll(request.query.includeDeleted === 'true');
  }

  @RequirePermissions([TABLES.DEPARTAMENTOS, OPERATIONS.CREATE])
  @Post()
  async create(@Body() data: Departamentos) {
    return this.service.create(data);
  }

  @RequirePermissions([TABLES.DEPARTAMENTOS, OPERATIONS.READ])
  @Get('get/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }

  @RequirePermissions([TABLES.DEPARTAMENTOS, OPERATIONS.UPDATE])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Departamentos) {
    return this.service.update(Number(id), data);
  }

  @RequirePermissions([TABLES.DEPARTAMENTOS, OPERATIONS.DELETE])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
