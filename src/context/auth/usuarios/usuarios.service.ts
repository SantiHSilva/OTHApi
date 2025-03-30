import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/utils/crud.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService extends CrudService {
  constructor(prisma: PrismaService) {
    super({
      MODELO: prisma.usuarios,
      NAMEMODEL: 'Usuarios',
    });
  }
}
