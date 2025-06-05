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
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
  OPERATIONS,
  RequirePermissions,
  TABLES,
} from 'src/constants/constants';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @RequirePermissions([TABLES.USUARIOS, OPERATIONS.READ])
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

  @RequirePermissions([TABLES.USUARIOS, OPERATIONS.READ])
  @Get()
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getAll(@Req() request: Request) {
    return this.service.getAll(request.query.includeDeleted === 'true');
  }
  @RequirePermissions([TABLES.USUARIOS, OPERATIONS.CREATE])
  @Post()
  async create(@Body() data: Usuarios) {
    return this.service.create(data);
  }

  @RequirePermissions([TABLES.USUARIOS, OPERATIONS.READ])
  @Get('get/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }

  @RequirePermissions([TABLES.USUARIOS, OPERATIONS.UPDATE])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Usuarios) {
    return this.service.update(Number(id), data);
  }

  @RequirePermissions([TABLES.USUARIOS, OPERATIONS.DELETE])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }

  @Post('/restore/:id')
  async restore(@Param('id') id ) {
    return this.service.restore(Number(id));
  }
}
