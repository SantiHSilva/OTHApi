import { NotFoundException } from '@nestjs/common';

interface props {
  MODELO: any;
  NAMEMODEL: string;
}

export class CrudService {
  constructor({ MODELO, NAMEMODEL }: props) {
    this.MODELO = MODELO;
    this.NAMEMODEL = NAMEMODEL;
  }

  MODELO: props['MODELO'];
  NAMEMODEL: props['NAMEMODEL'];

  async getPaginated(
    page: number,
    itemsPerPage: number,
    includeDeleted = false,
  ) {
    const isDeletedIncluded = includeDeleted ? {} : { deleted_at: null };
    const data = await this.MODELO.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      where: isDeletedIncluded,
    });
    const total = await this.MODELO.count({
      where: isDeletedIncluded,
    });
    const totalPages = Math.ceil(total / itemsPerPage);
    return { totalPages, total, data };
  }

  async getAll(includeDeleted = false) {
    const isDeletedIncluded = includeDeleted ? {} : { deleted_at: null };

    const data = await this.MODELO.findMany({
      where: isDeletedIncluded,
    });

    // eliminar deleted_at de la respuesta
    return data.map((item) => {
      if (includeDeleted) return item;
      delete item.deleted_at;
      return item;
    });
  }

  async create(data: object) {
    return this.MODELO.create({ data });
  }

  async getById(id: number) {
    const model = await this.MODELO.findUnique({ where: { id } });
    if (!model) {
      throw new NotFoundException(`${this.NAMEMODEL} not found`);
    }
    return model;
  }

  async update(id: number, data: object) {
    const exist = await this.MODELO.findUnique({ where: { id } });
    if (!exist) {
      throw new NotFoundException(`${this.NAMEMODEL} not found`);
    }
    return this.MODELO.update({ where: { id }, data });
  }

  async delete(id: number) {
    const exist = await this.MODELO.findUnique({ where: { id } });
    if (!exist) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.MODELO.update({
      where: { id },
      data: { deleted_at: new Date().toISOString() },
    });
  }

  async restore(id: number) {
    const exist = await this.MODELO.findUnique({ where: { id } });
    if (!exist) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.MODELO.update({
      where: { id },
      data: { deleted_at: null },
    });
  }
}
