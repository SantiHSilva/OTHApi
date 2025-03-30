import { PrismaClient } from '@prisma/client';
import { ADMINPRINCIPALNACIONALIDAD, ADMINROLENAME } from './general';
import { hashPassword } from '../../src/utils/utils';

export async function createSuperUser(prisma: PrismaClient) {
  if (await prisma.usuarios.findFirst({ where: { correo: 'admin@admin.com' } }))
    return;

  // create person
  const person = await prisma.personas.create({
    data: {
      apellidos: '',
      nombres: 'Administrador general',
      sexo: true,
      direccion_domicilio: '',
      direccion_notificacion: '',
      telefono: '',
      nacionalidad_id: (
        await prisma.paises.findFirst({
          where: {
            descripcion: ADMINPRINCIPALNACIONALIDAD,
          },
        })
      ).id,
    },
  });

  // create user

  await prisma.usuarios.create({
    data: {
      correo: 'admin@admin.com',
      password: await hashPassword('obs_2024_by_jhonson'),
      persona_id: person.id,
      rol_id: (
        await prisma.roles.findFirst({
          where: {
            descripcion: ADMINROLENAME,
          },
        })
      ).id,
    },
  });
}
