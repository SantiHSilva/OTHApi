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
import { PaisesService } from './paises.service';
import { Paises } from './paises.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
  OPERATIONS,
  Public,
  RequirePermissions,
  TABLES,
} from 'src/constants/constants';
@ApiTags('Paises')
@ApiBearerAuth()
@Controller('paises')
export class PaisesController {
  constructor(private readonly service: PaisesService) {}

  @Public()
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

  @Public()
  @Get()
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getAll(@Req() request: Request) {
    return this.service.getAll(request.query.includeDeleted === 'true');
  }

  @RequirePermissions([TABLES.PAISES, OPERATIONS.CREATE])
  @Post()
  async create(@Body() data: Paises) {
    return this.service.create(data);
  }

  @Public()
  @Get('get/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }

  @RequirePermissions([TABLES.PAISES, OPERATIONS.UPDATE])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Paises) {
    return this.service.update(Number(id), data);
  }

  @RequirePermissions([TABLES.PAISES, OPERATIONS.DELETE])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
