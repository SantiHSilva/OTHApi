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
import { RolesService } from './roles.service';
import { Roles } from './roles.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  INCLUDEDELETEDPARAM,
  OPERATIONS,
  RequirePermissions,
  TABLES,
} from 'src/constants/constants';
@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @RequirePermissions([TABLES.ROLES, OPERATIONS.READ])
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

  @RequirePermissions([TABLES.ROLES, OPERATIONS.READ])
  @Get()
  @ApiQuery(INCLUDEDELETEDPARAM)
  async getAll(@Req() request: Request) {
    return this.service.getAll(request.query.includeDeleted === 'true');
  }

  @RequirePermissions([TABLES.ROLES, OPERATIONS.CREATE])
  @Post()
  async create(@Body() data: Roles) {
    return this.service.create(data);
  }

  @RequirePermissions([TABLES.ROLES, OPERATIONS.READ])
  @Get('get/:id')
  async getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }

  @RequirePermissions([TABLES.ROLES, OPERATIONS.UPDATE])
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Roles) {
    return this.service.update(Number(id), data);
  }

  @RequirePermissions([TABLES.ROLES, OPERATIONS.DELETE])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
