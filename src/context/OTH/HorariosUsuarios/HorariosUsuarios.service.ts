import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/utils/crud.service';
import { Horario, HorariosUsuarios } from './HorariosUsuarios.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class HorariosUsuariosService extends CrudService {
  constructor(readonly prisma: PrismaService) {
    super({
      MODELO: prisma.horariosUsuarios,
      NAMEMODEL: 'HorariosUsuarios',
    });
  }

  async saveSchedule(idUser: number, idSchedule: number, horarios: Horario[]){

    // ----------------------------------------------------
    // Verificar si el horario existe
    // ----------------------------------------------------
    const exist = await this.prisma.horariosUsuarios.findUnique({
      where: { id: idSchedule },
    });

    if (!exist) {
      throw new NotFoundException(`Este horario no existe.`);
    }

    if (exist.usuario_id !== idUser) {
      throw new NotFoundException(`No tienes permisos para modificar el horario.`);
    }

    try{
await this.prisma.$transaction(async (prisma) => {

      // ----------------------------------------------------
      // Eliminar las materias y detalles horarios existentes
      // ----------------------------------------------------

    // ----------------------------------------------------
    // Eliminar las materias y detalles horarios existentes
    // ----------------------------------------------------

    const materias = await prisma.materias.findMany({
      where: {
        id_horario: idSchedule,
      },
      select: {
        id: true,
      }
    });

    console.log('materias', materias);

    const idsMaterias = materias.map((materia) => materia.id);

    console.log('idsMaterias', idsMaterias);

    if (idsMaterias.length) {
      await prisma.detallesMaterias.deleteMany({
        where: {
          id_materia: {
            in: idsMaterias,
          }
        }
      });
      console.log('detallesMaterias cleaned');

      const horariosMaterias = await prisma.horariosMaterias.findMany({
        where: {
          id_materia: {
            in: idsMaterias,
          }
        },
        select: {
          id: true,
        }
      });

      // Eliminar detalleshorariosmaterias
      const idsHorariosMaterias = horariosMaterias.map((horario) => horario.id);
      console.log('idsHorariosMaterias', idsHorariosMaterias);

      if (idsHorariosMaterias.length) {
        await prisma.detallesHorariosMaterias.deleteMany({
          where: {
            id_horario_materia: {
              in: idsHorariosMaterias,
            }
          }
        });
        console.log('detallesHorariosMaterias cleaned');
      }

      // Eliminar los registros en HorariosMaterias asociados a las materias
      await prisma.horariosMaterias.deleteMany({
        where: {
          id_materia: {
            in: idsMaterias,
          },
        },
      });
      console.log('horariosMaterias cleaned');
    }

    await prisma.materias.deleteMany({
      where: {
        id_horario: idSchedule,
      }
    });


      console.log('materias cleaned')

      // ----------------------------------------------------
      // Guardar las materias y detalles horarios
      // ----------------------------------------------------

      for (const horario of horarios) {

        const materiaDB = await prisma.materias.create({
          data: {
            color: horario.color,
            nombre: horario.name,
            id_horario: idSchedule,
          }
        })

        const idMateria = materiaDB.id;

        let opcion = 0;
        for (const materia of horario.materias) {
          opcion++;
          // ! Descripciones Generales
          for (const descripcion of materia.descripciones_generales) {
            await prisma.detallesMaterias.create({
              data: {
                orden: opcion,
                id_materia: idMateria,
                descripcion: descripcion.titulo,
                mostrar: descripcion.mostrar_en_tabla,
              }
            })
          }
          
          // ! Descripción por día

          for (const horario of materia.descripciones_por_dia) {
            const horarioDB = await prisma.horariosMaterias.create({
              data: {
                orden: opcion,
                dia: horario.dia,
                hora_fin: horario.fin,
                hora_inicio: horario.inicio,
                id_materia: idMateria,
              }
            })

            for (const ajuste of horario.ajustes) {
              await prisma.detallesHorariosMaterias.create({
                data: {
                  orden: opcion,
                  id_horario_materia: horarioDB.id,
                  descripcion: ajuste.titulo,
                  mostrar: ajuste.mostrar_en_tabla,
                }
              })
            }
          }
        }
      }

      return "El horario se ha guardado correctamente";
    })
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error al guardar el horario`);
    }
  }

  async getSchedulePublic(urlPublica: string) {
    const horario = await this.prisma.compartirHorario.findUnique({
      where: { url: urlPublica },
      include: {
        HorariosUsuarios: {
          include: {
            ComentariosHorario: true,
            CompartirHorario: {
              select: {
                url: true,
              }
            },
            Materias: {
              include: {
                HorariosMaterias: {
                  include: {
                    DetallesHorariosMaterias: true,
                  }
                },
                DetallesMaterias: true,
              }
            }
          }
        }
      }
    });

    if (!horario) {
      throw new NotFoundException(`Horario no encontrado`);
    }

    return {
      ...horario.HorariosUsuarios,
      CompartirHorario: horario.url,
    };
  }

  async getDetailsSchedule(idSchedule: number, idUser){
    const horario = await this.prisma.horariosUsuarios.findUnique({
      where: { id: idSchedule, usuario_id: idUser },
      include: {
        ComentariosHorario: true,
        CompartirHorario: {
          select: {
            url: true,
          }
        },
        Materias: {
          include: {
            HorariosMaterias: {
              include: {
                DetallesHorariosMaterias: true,
              }
            },
            DetallesMaterias: true,
          }
        }
      }
    });

    if (!horario) {
      throw new NotFoundException(`${this.NAMEMODEL} not found`);
    }

    return {
      ...horario,
      CompartirHorario: horario.CompartirHorario.length ? horario.CompartirHorario[0].url : null,
    }
  }

  async getAllDetail(includeDeleted: boolean, idUser: number) {
    const isDeletedIncluded = includeDeleted ? {} : { deleted_at: null };
    const data = (await this.prisma.horariosUsuarios.findMany({
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
    return data;
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
