// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import { PrismaClient } from '@prisma/client';
import { createRoles } from './seeders/roles';
import { createPaises } from './seeders/paises';
import { createDepartamentos } from './seeders/departamentos';
import { createCiudades } from './seeders/ciudades';
import { createSuperUser } from './seeders/superUser';

const prisma = new PrismaClient();

async function main() {
  await createRoles(prisma);
  await createPaises(prisma);
  await createDepartamentos(prisma);
  await createCiudades(prisma);
  await createSuperUser(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
