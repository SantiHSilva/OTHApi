import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ADMINROLENAME } from './general';

const data: Prisma.RolesCreateManyInput[] = [
  {
    descripcion: 'Civil',
  },
  {
    descripcion: 'Funcionario',
  },
  {
    descripcion: 'Agente de Transito',
  },
  {
    descripcion: 'Secretario',
  },
  {
    descripcion: ADMINROLENAME,
  },
];

export async function createRoles(prisma: PrismaClient) {
  // Verificar si ya existen roles
  const roles = await prisma.roles.findMany({
    where: {
      descripcion: {
        in: data.map((rol) => rol.descripcion),
      },
    },
  });

  // Si ya existen roles, no se crean
  if (roles.length > 0) return;

  await prisma.roles.createMany({
    data: data,
  });
}
