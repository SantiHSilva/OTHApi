import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../src/utils/utils';
import { ADMINROLENAME, ADMINEMAIL, ADMINPASSWORD, ADMINPRINCIPALNACIONALIDAD } from './general';

export async function createSuperUser(prisma: PrismaClient) {
  if (await prisma.usuarios.findFirst({ where: { correo: ADMINEMAIL } }))
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
      correo: ADMINEMAIL,
      password: await hashPassword(ADMINPASSWORD),
      rol_id: (
        await prisma.roles.findFirst({
          where: {
            descripcion: ADMINROLENAME,
          },
        })
      ).id,
      persona_id: person.id,
    },
  });
}
