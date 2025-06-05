import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/utils/crud.service';

@Injectable()
export class DetallesMateriasService extends CrudService {
  constructor(readonly prisma: PrismaService) {
    super({
      MODELO: prisma.detallesMaterias,
      NAMEMODEL: 'DetallesMaterias',
    });
  }
}
