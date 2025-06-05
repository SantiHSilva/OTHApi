import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/utils/crud.service';

@Injectable()
export class MateriasService extends CrudService {
  constructor(readonly prisma: PrismaService) {
    super({
      MODELO: prisma.materias,
      NAMEMODEL: 'Materias',
    });
  }
}
