import { PrismaClient } from '@prisma/client';
import { DEFAULT_PERMISSION_ENABLED, TABLES } from 'src/constants/constants';

const prisma = new PrismaClient();

export async function syncPerms() {
  const roles = await prisma.roles.findMany();

  roles.forEach(async (rol) => {
    Object.keys(TABLES).forEach(async (table) => {
      const exist = await prisma.permisos.findFirst({
        where: {
          rol_id: rol.id,
          tabla: table,
        },
      });

      if (exist) return;

      await prisma.permisos.create({
        data: {
          rol_id: rol.id,
          tabla: table,
          agregar: DEFAULT_PERMISSION_ENABLED,
          eliminar: DEFAULT_PERMISSION_ENABLED,
          modificar: DEFAULT_PERMISSION_ENABLED,
          leer: DEFAULT_PERMISSION_ENABLED,
        },
      });
    });
  });
}
