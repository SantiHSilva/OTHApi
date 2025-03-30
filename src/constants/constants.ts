import { SetMetadata } from '@nestjs/common';
import { ApiQueryOptions } from '@nestjs/swagger';
import { join } from 'path';
import { MBtoBytes } from 'src/utils/utils';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const DEFAULT_PERMISSION_ENABLED = false;

export const OPERATIONS = {
  CREATE: 'agregar',
  READ: 'leer',
  UPDATE: 'modificar',
  DELETE: 'eliminar',
};

export const TABLES = {
  PERSONAS: 'PERSONAS',
  PAISES: 'PAISES',
  ROLES: 'ROLES',
  PERMISOS: 'PERMISOS',
  USUARIOS: 'USUARIOS',
  DEPARTAMENTOS: 'DEPARTAMENTOS',
  CIUDADES: 'CIUDADES',
};

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: string[][]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const defaultUserRoleName = 'Ciudadano';

export const MAX_SIZE_FILE = MBtoBytes(
  parseInt(process.env.MAX_FILE_SIZE_IN_MB),
);

export const FOLDER_UPLOAD = 'uploads';

export const UPLOAD_DIR = join(process.cwd(), FOLDER_UPLOAD);

export const INCLUDEDELETEDPARAM: ApiQueryOptions = {
  name: 'includeDeleted',
  required: false,
  enum: ['true', 'false'],
  description: 'Incluir los registros eliminados',
};

export const FIILTRO_FECHA_INICIO: ApiQueryOptions = {
  name: 'fechaInicio',
  required: true,
  type: 'string',
  example: new Date().toISOString(),
  description:
    'Fecha de inicio de la estadística en formato Date.prototype.toISOString()',
};

export const FIILTRO_FECHA_FIN: ApiQueryOptions = {
  name: 'fechaFin',
  required: true,
  type: 'string',
  example: new Date(
    new Date().setMonth(new Date().getMonth() + 1),
  ).toISOString(),
  description:
    'Fecha de inicio de la estadística en formato Date.prototype.toISOString()',
};

export const SEVERIDAD_SINIESTRO: ApiQueryOptions = {
  name: 'severidadSiniestroId',
  required: false,
  type: 'number',
  description: 'Severidad del siniestro id',
};

export const SEXO: ApiQueryOptions = {
  name: 'sexo',
  required: false,
  type: 'boolean',
  description:
    'Sexo de la persona, true para hombre, false para mujer, null para ambos',
};

export const SINIESTROS: ApiQueryOptions = {
  name: 'siniestros',
  required: false,
  type: 'boolean',
  description:
    'Mostrar los siniestros, true para mostrar los oficiales (tabla siniestros), false para mostrar los ciudadanos (tabla reporte_ciudadano_siniestros_viales), null para ambos',
};

export const PAGE_PER_ITEMS: ApiQueryOptions = {
  name: 'itemsPerPage',
  required: true,
  type: 'number',
  description: 'Cantidad de registros por página',
  example: 10,
};

export const PAGE: ApiQueryOptions = {
  name: 'page',
  required: true,
  type: 'number',
  description: 'Número de página',
  example: 1,
};
