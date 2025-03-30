import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/utils/crud.service';

@Injectable()
export class RolesService extends CrudService {
  constructor(prisma: PrismaService) {
    super({
      MODELO: prisma.roles,
      NAMEMODEL: 'Roles',
    });
  }
}
