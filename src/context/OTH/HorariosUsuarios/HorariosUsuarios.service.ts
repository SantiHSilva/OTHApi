import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/utils/crud.service';
import { HorariosUsuarios } from './HorariosUsuarios.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class HorariosUsuariosService extends CrudService {
  constructor(readonly prisma: PrismaService) {
    super({
      MODELO: prisma.horariosUsuarios,
      NAMEMODEL: 'HorariosUsuarios',
    });
  }

  async getPaginatedByUser(page: number, itemsPerPage: number, includeDeleted: boolean, idUser: number) {
    const isDeletedIncluded = includeDeleted ? {} : { deleted_at: null };
    const data = (await this.prisma.horariosUsuarios.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      where: { ...isDeletedIncluded, usuario_id: idUser },
      include: {
        ComentariosHorario: true,
        CompartirHorario: {
          select: {
            url: true,
          }
        },
        Materias: {
          include: {
            HorariosMaterias: true
          }
        }
      }
    })).map((horario) => {
      return {
        ...horario,
        CompartirHorario: horario.CompartirHorario.length ? horario.CompartirHorario[0].url : null,
      }
    })
    const total = await this.prisma.horariosUsuarios.count({
      where: { ...isDeletedIncluded, usuario_id: idUser },
    });
    const totalPages = Math.ceil(total / itemsPerPage);
    return { totalPages, total, data };
  }

  async createByUser(data: HorariosUsuarios, idUser: number): Promise<any> {
    const horariosUsuariosData = { ...data, usuario_id: idUser };
    return super.create(horariosUsuariosData);
  }

  async updateByUser(id: number, data: object, idUser: number) {
    const exist = await this.prisma.horariosUsuarios.findUnique({ where: { id, usuario_id: idUser } });
    if (!exist) {
      throw new NotFoundException(`${this.NAMEMODEL} not found`);
    }
    return this.prisma.horariosUsuarios.update({ where: { id }, data });
  }

  async deleteByUser(id: number, idUser: number) {
    const exist = await this.prisma.horariosUsuarios.findUnique({ where: { id, usuario_id: idUser } });
    if (!exist) {
      throw new NotFoundException(`${id} not found`);
    }

    await this.prisma.compartirHorario.deleteMany({ where: { horario_id: id } });

    return this.prisma.horariosUsuarios.update({
      where: { id },
      data: { deleted_at: new Date().toISOString() },
    });
  }

  async convertHorarioToPublic(id: number, idUser: number, url: string){
    const exist = await this.prisma.horariosUsuarios.findUnique({ where: { id, usuario_id: idUser } });
    if (!exist) {
      throw new NotFoundException(`${id} not found`);
    }
    // compartirHorario
    // 1. La URL no ha sido tomada, debe ser unica
    // 2. Si el horario no ha sido compartido, se crea el registro
    // 3. Si el horario ya ha sido compartido, se actualiza el registro
    // 4. Si la URL es vacía, se elimina el registro
    // 5. Si la URL ya fue tomada, se lanza un error
    const existUrl = await this.prisma.compartirHorario.findFirst({ where: { url } });
    if (existUrl) {
      throw new NotFoundException(`La URL ${url} ya ha sido tomada`);
    }
    const existCompartido = await this.prisma.compartirHorario.findFirst({ where: { horario_id: id } });
    if (existCompartido) {
      if (url === '') {
        return this.prisma.compartirHorario.delete({ where: { id: existCompartido.id } });
      }
      return this.prisma.compartirHorario.update({
        where: { id: existCompartido.id },
        data: { url },
      });
    }
    if (url === '') {
      return this.prisma.compartirHorario.delete({ where: { id: existCompartido.id } });
    }
    return this.prisma.compartirHorario.create({
      data: { url, horario_id: id },
    });
  }
}
