import { Prisma, PrismaClient } from "@prisma/client";

const TABLES = {
  PERSONAS: 'PERSONAS',
  PAISES: 'PAISES',
  ROLES: 'ROLES',
  PERMISOS: 'PERMISOS',
  USUARIOS: 'USUARIOS',
  DEPARTAMENTOS: 'DEPARTAMENTOS',
  CIUDADES: 'CIUDADES',
  COMPARTIR_HORARIO: 'COMPARTIR_HORARIO',
  DETALLES_HORARIOS_MATERIAS: 'DETALLES_HORARIOS_MATERIAS',
  DETALLES_MATERIAS: 'DETALLES_MATERIAS',
  HORARIOS_MATERIAS: 'HORARIOS_MATERIAS',
  HORARIOS_USUARIOS: 'HORARIOS_USUARIOS',
  MATERIAS: 'MATERIAS',
};

const CIVIL_ID = 1;
const ADMIN_ID = 5;

interface setPermissionsI {
  idRol: number;
  permisos: {
    tabla: string;
    agregar?: boolean;
    eliminar?: boolean;
    modificar?: boolean;
    leer?: boolean;
  }[];
}

function giveAllPermissions(id: number) {
  return {
    idRol: id,
    permisos: Object.keys(TABLES).map((tabla) => ({
      tabla: TABLES[tabla],
      agregar: true,
      eliminar: true,
      modificar: true,
      leer: true,
    })),
  };
}

function giveAllToRead(id: number) {
  return {
    idRol: id,
    permisos: Object.keys(TABLES).map((tabla) => ({
      tabla: TABLES[tabla],
      agregar: false,
      eliminar: false,
      modificar: false,
      leer: true,
    })),
  };
}

function setPermissions({ idRol, permisos }: setPermissionsI) {
  return permisos.map((permiso) => ({
    rol_id: idRol,
    tabla: permiso.tabla,
    agregar: permiso.agregar || false,
    eliminar: permiso.eliminar || false,
    modificar: permiso.modificar || false,
    leer: permiso.leer || false,
  }));
}

const data: Prisma.PermisosCreateManyInput[] = [
  // Civil
  ...setPermissions(giveAllToRead(CIVIL_ID)),
  // Admin
  ...setPermissions(giveAllPermissions(ADMIN_ID)),
]

export async function createPermisos(prisma: PrismaClient) {
  // Verificar si ya existen roles
  const roles = await prisma.permisos.findMany({
    where: {
      rol_id: {
        in: data.map((permiso) => permiso.rol_id),
      },
    },
  });

  // Si ya existen roles, no se crean
  if (roles.length > 0) return;

  await prisma.permisos.createMany({
    data: data,
  });
}