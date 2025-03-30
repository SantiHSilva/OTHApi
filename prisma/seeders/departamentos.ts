import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ADMINPRINCIPALNACIONALIDAD } from './general';

export async function createDepartamentos(prisma: PrismaClient) {
  const data = await createData(prisma);

  const find = await prisma.departamentos.findMany({
    where: {
      descripcion: {
        in: data.map((individual) => individual.descripcion),
      },
    },
  });

  // Si ya existen actores, no se crean
  if (find.length > 0) return;

  await prisma.departamentos.createMany({
    data: data,
  });
}

async function getPaisIdColombia(prisma: PrismaClient) {
  const pais = await prisma.paises.findFirst({
    where: {
      descripcion: ADMINPRINCIPALNACIONALIDAD,
    },
  });

  if (!pais) {
    throw new Error('No se encontro el pais Colombia');
  }

  return pais?.id;
}

async function createData(
  prisma: PrismaClient,
): Promise<Prisma.DepartamentosCreateManyInput[]> {
  const paisId = await getPaisIdColombia(prisma);

  return [
    { codigo: '05', descripcion: 'ANTIOQUIA', pais_id: paisId },
    { codigo: '08', descripcion: 'ATLANTICO', pais_id: paisId },
    { codigo: '11', descripcion: 'BOGOTA', pais_id: paisId },
    { codigo: '13', descripcion: 'BOLIVAR', pais_id: paisId },
    { codigo: '15', descripcion: 'BOYACA', pais_id: paisId },
    { codigo: '17', descripcion: 'CALDAS', pais_id: paisId },
    { codigo: '18', descripcion: 'CAQUETA', pais_id: paisId },
    { codigo: '19', descripcion: 'CAUCA', pais_id: paisId },
    { codigo: '20', descripcion: 'CESAR', pais_id: paisId },
    { codigo: '23', descripcion: 'CORDOBA', pais_id: paisId },
    { codigo: '25', descripcion: 'CUNDINAMARCA', pais_id: paisId },
    { codigo: '27', descripcion: 'CHOCO', pais_id: paisId },
    { codigo: '41', descripcion: 'HUILA', pais_id: paisId },
    { codigo: '44', descripcion: 'LA GUAJIRA', pais_id: paisId },
    { codigo: '47', descripcion: 'MAGDALENA', pais_id: paisId },
    { codigo: '50', descripcion: 'META', pais_id: paisId },
    { codigo: '52', descripcion: 'NARIÑO', pais_id: paisId },
    { codigo: '54', descripcion: 'N. DE SANTANDER', pais_id: paisId },
    { codigo: '63', descripcion: 'QUINDIO', pais_id: paisId },
    { codigo: '66', descripcion: 'RISARALDA', pais_id: paisId },
    { codigo: '68', descripcion: 'SANTANDER', pais_id: paisId },
    { codigo: '70', descripcion: 'SUCRE', pais_id: paisId },
    { codigo: '73', descripcion: 'TOLIMA', pais_id: paisId },
    { codigo: '76', descripcion: 'VALLE DEL CAUCA', pais_id: paisId },
    { codigo: '81', descripcion: 'ARAUCA', pais_id: paisId },
    { codigo: '85', descripcion: 'CASANARE', pais_id: paisId },
    { codigo: '86', descripcion: 'PUTUMAYO', pais_id: paisId },
    { codigo: '88', descripcion: 'SAN ANDRES', pais_id: paisId },
    { codigo: '91', descripcion: 'AMAZONAS', pais_id: paisId },
    { codigo: '94', descripcion: 'GUAINIA', pais_id: paisId },
    { codigo: '95', descripcion: 'GUAVIARE', pais_id: paisId },
    { codigo: '97', descripcion: 'VAUPES', pais_id: paisId },
    { codigo: '99', descripcion: 'VICHADA', pais_id: paisId },
  ];
}
