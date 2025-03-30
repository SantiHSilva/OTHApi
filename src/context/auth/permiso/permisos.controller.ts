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
import { PermisosService } from './permisos.service';
import { Permisos } from './permisos.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { INCLUDEDELETEDPARAM } from 'src/constants/constants';
import {
  OPERATIONS,
  RequirePermissions,
  TABLES,
} from 'src/constants/constants';

@ApiTags('Permisos')
@ApiBearerAuth()
@Controller('permisos')
export class PermisosController {
  constructor(private readonly service: PermisosService) {}

  @RequirePermissions([TABLES.PERMISOS, OPERATIONS.READ])
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

  @RequirePermissions([TABLES.PERMISOS, OPERATIONS.READ])
  @Get()
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getAll(@Req() request: Request) {
    return this.service.getAll(request.query.includeDeleted === 'true');
  }

  @RequirePermissions([TABLES.PERMISOS, OPERATIONS.CREATE])
  @Post()
  async create(@Body() data: Permisos) {
    return this.service.create(data);
  }

  @RequirePermissions([TABLES.PERMISOS, OPERATIONS.READ])
  @Get('get/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }

  @RequirePermissions([TABLES.PERMISOS, OPERATIONS.UPDATE])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Permisos) {
    return this.service.update(Number(id), data);
  }

  @RequirePermissions([TABLES.PERMISOS, OPERATIONS.DELETE])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
