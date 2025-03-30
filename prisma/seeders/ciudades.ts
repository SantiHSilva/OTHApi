import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

export async function createCiudades(prisma: PrismaClient) {
  const data = await createData(prisma);

  const find = await prisma.ciudades.findMany({
    where: {
      descripcion: {
        in: data.map((individual) => individual.descripcion),
      },
    },
  });

  // Si ya existen actores, no se crean
  if (find.length > 0) return;

  await prisma.ciudades.createMany({
    data: data,
  });
}

async function createData(
  prisma: PrismaClient,
): Promise<Prisma.CiudadesCreateManyInput[]> {
  interface dataI {
    codigo: string;
    descripcion: string;
    departamento_id: string | number;
  }

  const data: dataI[] = [
    {
      codigo: '001',
      descripcion: 'MEDELLIN',
      departamento_id: '05',
    },
    {
      codigo: '002',
      descripcion: 'ABEJORRAL',
      departamento_id: '05',
    },
    {
      codigo: '004',
      descripcion: 'ABRIAQUI',
      departamento_id: '05',
    },
    {
      codigo: '021',
      descripcion: 'ALEJANDRIA',
      departamento_id: '05',
    },
    {
      codigo: '030',
      descripcion: 'AMAGA',
      departamento_id: '05',
    },
    {
      codigo: '031',
      descripcion: 'AMALFI',
      departamento_id: '05',
    },
    {
      codigo: '034',
      descripcion: 'ANDES',
      departamento_id: '05',
    },
    {
      codigo: '036',
      descripcion: 'ANGELOPOLIS',
      departamento_id: '05',
    },
    {
      codigo: '038',
      descripcion: 'ANGOSTURA',
      departamento_id: '05',
    },
    {
      codigo: '040',
      descripcion: 'ANORI',
      departamento_id: '05',
    },
    {
      codigo: '042',
      descripcion: 'SANTAFE DE ANTIOQUIA',
      departamento_id: '05',
    },
    {
      codigo: '044',
      descripcion: 'ANZA',
      departamento_id: '05',
    },
    {
      codigo: '045',
      descripcion: 'APARTADO',
      departamento_id: '05',
    },
    {
      codigo: '051',
      descripcion: 'ARBOLETES',
      departamento_id: '05',
    },
    {
      codigo: '055',
      descripcion: 'ARGELIA',
      departamento_id: '05',
    },
    {
      codigo: '059',
      descripcion: 'ARMENIA',
      departamento_id: '05',
    },
    {
      codigo: '079',
      descripcion: 'BARBOSA',
      departamento_id: '05',
    },
    {
      codigo: '086',
      descripcion: 'BELMIRA',
      departamento_id: '05',
    },
    {
      codigo: '088',
      descripcion: 'BELLO',
      departamento_id: '05',
    },
    {
      codigo: '091',
      descripcion: 'BETANIA',
      departamento_id: '05',
    },
    {
      codigo: '093',
      descripcion: 'BETULIA',
      departamento_id: '05',
    },
    {
      codigo: '101',
      descripcion: 'CIUDAD BOLIVAR',
      departamento_id: '05',
    },
    {
      codigo: '107',
      descripcion: 'BRICE\u00d1O',
      departamento_id: '05',
    },
    {
      codigo: '113',
      descripcion: 'BURITICA',
      departamento_id: '05',
    },
    {
      codigo: '120',
      descripcion: 'CACERES',
      departamento_id: '05',
    },
    {
      codigo: '125',
      descripcion: 'CAICEDO',
      departamento_id: '05',
    },
    {
      codigo: '129',
      descripcion: 'CALDAS',
      departamento_id: '05',
    },
    {
      codigo: '134',
      descripcion: 'CAMPAMENTO',
      departamento_id: '05',
    },
    {
      codigo: '138',
      descripcion: 'CA\u00d1ASGORDAS',
      departamento_id: '05',
    },
    {
      codigo: '142',
      descripcion: 'CARACOLI',
      departamento_id: '05',
    },
    {
      codigo: '145',
      descripcion: 'CARAMANTA',
      departamento_id: '05',
    },
    {
      codigo: '147',
      descripcion: 'CAREPA',
      departamento_id: '05',
    },
    {
      codigo: '148',
      descripcion: 'EL CARMEN DE VIBORAL',
      departamento_id: '05',
    },
    {
      codigo: '150',
      descripcion: 'CAROLINA',
      departamento_id: '05',
    },
    {
      codigo: '154',
      descripcion: 'CAUCASIA',
      departamento_id: '05',
    },
    {
      codigo: '172',
      descripcion: 'CHIGORODO',
      departamento_id: '05',
    },
    {
      codigo: '190',
      descripcion: 'CISNEROS',
      departamento_id: '05',
    },
    {
      codigo: '197',
      descripcion: 'COCORNA',
      departamento_id: '05',
    },
    {
      codigo: '206',
      descripcion: 'CONCEPCION',
      departamento_id: '05',
    },
    {
      codigo: '209',
      descripcion: 'CONCORDIA',
      departamento_id: '05',
    },
    {
      codigo: '212',
      descripcion: 'COPACABANA',
      departamento_id: '05',
    },
    {
      codigo: '234',
      descripcion: 'DABEIBA',
      departamento_id: '05',
    },
    {
      codigo: '237',
      descripcion: 'DON MATIAS',
      departamento_id: '05',
    },
    {
      codigo: '240',
      descripcion: 'EBEJICO',
      departamento_id: '05',
    },
    {
      codigo: '250',
      descripcion: 'EL BAGRE',
      departamento_id: '05',
    },
    {
      codigo: '264',
      descripcion: 'ENTRERRIOS',
      departamento_id: '05',
    },
    {
      codigo: '266',
      descripcion: 'ENVIGADO',
      departamento_id: '05',
    },
    {
      codigo: '282',
      descripcion: 'FREDONIA',
      departamento_id: '05',
    },
    {
      codigo: '284',
      descripcion: 'FRONTINO',
      departamento_id: '05',
    },
    {
      codigo: '306',
      descripcion: 'GIRALDO',
      departamento_id: '05',
    },
    {
      codigo: '308',
      descripcion: 'GIRARDOTA',
      departamento_id: '05',
    },
    {
      codigo: '310',
      descripcion: 'GOMEZ PLATA',
      departamento_id: '05',
    },
    {
      codigo: '313',
      descripcion: 'GRANADA',
      departamento_id: '05',
    },
    {
      codigo: '315',
      descripcion: 'GUADALUPE',
      departamento_id: '05',
    },
    {
      codigo: '318',
      descripcion: 'GUARNE',
      departamento_id: '05',
    },
    {
      codigo: '321',
      descripcion: 'GUATAPE',
      departamento_id: '05',
    },
    {
      codigo: '347',
      descripcion: 'HELICONIA',
      departamento_id: '05',
    },
    {
      codigo: '353',
      descripcion: 'HISPANIA',
      departamento_id: '05',
    },
    {
      codigo: '360',
      descripcion: 'ITAGUI',
      departamento_id: '05',
    },
    {
      codigo: '361',
      descripcion: 'ITUANGO',
      departamento_id: '05',
    },
    {
      codigo: '364',
      descripcion: 'JARDIN',
      departamento_id: '05',
    },
    {
      codigo: '368',
      descripcion: 'JERICO',
      departamento_id: '05',
    },
    {
      codigo: '376',
      descripcion: 'LA CEJA',
      departamento_id: '05',
    },
    {
      codigo: '380',
      descripcion: 'LA ESTRELLA',
      departamento_id: '05',
    },
    {
      codigo: '390',
      descripcion: 'LA PINTADA',
      departamento_id: '05',
    },
    {
      codigo: '400',
      descripcion: 'LA UNION',
      departamento_id: '05',
    },
    {
      codigo: '411',
      descripcion: 'LIBORINA',
      departamento_id: '05',
    },
    {
      codigo: '425',
      descripcion: 'MACEO',
      departamento_id: '05',
    },
    {
      codigo: '440',
      descripcion: 'MARINILLA',
      departamento_id: '05',
    },
    {
      codigo: '467',
      descripcion: 'MONTEBELLO',
      departamento_id: '05',
    },
    {
      codigo: '475',
      descripcion: 'MURINDO',
      departamento_id: '05',
    },
    {
      codigo: '480',
      descripcion: 'MUTATA',
      departamento_id: '05',
    },
    {
      codigo: '483',
      descripcion: 'NARI\u00d1O',
      departamento_id: '05',
    },
    {
      codigo: '490',
      descripcion: 'NECOCLI',
      departamento_id: '05',
    },
    {
      codigo: '495',
      descripcion: 'NECHI',
      departamento_id: '05',
    },
    {
      codigo: '501',
      descripcion: 'OLAYA',
      departamento_id: '05',
    },
    {
      codigo: '541',
      descripcion: 'PE\u00d0OL',
      departamento_id: '05',
    },
    {
      codigo: '543',
      descripcion: 'PEQUE',
      departamento_id: '05',
    },
    {
      codigo: '576',
      descripcion: 'PUEBLORRICO',
      departamento_id: '05',
    },
    {
      codigo: '579',
      descripcion: 'PUERTO BERRIO',
      departamento_id: '05',
    },
    {
      codigo: '585',
      descripcion: 'PUERTO NARE',
      departamento_id: '05',
    },
    {
      codigo: '591',
      descripcion: 'PUERTO TRIUNFO',
      departamento_id: '05',
    },
    {
      codigo: '604',
      descripcion: 'REMEDIOS',
      departamento_id: '05',
    },
    {
      codigo: '607',
      descripcion: 'RETIRO',
      departamento_id: '05',
    },
    {
      codigo: '615',
      descripcion: 'RIONEGRO',
      departamento_id: '05',
    },
    {
      codigo: '628',
      descripcion: 'SABANALARGA',
      departamento_id: '05',
    },
    {
      codigo: '631',
      descripcion: 'SABANETA',
      departamento_id: '05',
    },
    {
      codigo: '642',
      descripcion: 'SALGAR',
      departamento_id: '05',
    },
    {
      codigo: '647',
      descripcion: 'SAN ANDRES DE CUERQUIA',
      departamento_id: '05',
    },
    {
      codigo: '649',
      descripcion: 'SAN CARLOS',
      departamento_id: '05',
    },
    {
      codigo: '652',
      descripcion: 'SAN FRANCISCO',
      departamento_id: '05',
    },
    {
      codigo: '656',
      descripcion: 'SAN JERONIMO',
      departamento_id: '05',
    },
    {
      codigo: '658',
      descripcion: 'SAN JOSE DE LA MONTA\u00d1A',
      departamento_id: '05',
    },
    {
      codigo: '659',
      descripcion: 'SAN JUAN DE URABA',
      departamento_id: '05',
    },
    {
      codigo: '660',
      descripcion: 'SAN LUIS',
      departamento_id: '05',
    },
    {
      codigo: '664',
      descripcion: 'SAN PEDRO',
      departamento_id: '05',
    },
    {
      codigo: '665',
      descripcion: 'SAN PEDRO DE URABA',
      departamento_id: '05',
    },
    {
      codigo: '667',
      descripcion: 'SAN RAFAEL',
      departamento_id: '05',
    },
    {
      codigo: '670',
      descripcion: 'SAN ROQUE',
      departamento_id: '05',
    },
    {
      codigo: '674',
      descripcion: 'SAN VICENTE',
      departamento_id: '05',
    },
    {
      codigo: '679',
      descripcion: 'SANTA BARBARA',
      departamento_id: '05',
    },
    {
      codigo: '686',
      descripcion: 'SANTA ROSA DE OSOS',
      departamento_id: '05',
    },
    {
      codigo: '690',
      descripcion: 'SANTO DOMINGO',
      departamento_id: '05',
    },
    {
      codigo: '697',
      descripcion: 'EL SANTUARIO',
      departamento_id: '05',
    },
    {
      codigo: '736',
      descripcion: 'SEGOVIA',
      departamento_id: '05',
    },
    {
      codigo: '756',
      descripcion: 'SONSON',
      departamento_id: '05',
    },
    {
      codigo: '761',
      descripcion: 'SOPETRAN',
      departamento_id: '05',
    },
    {
      codigo: '789',
      descripcion: 'TAMESIS',
      departamento_id: '05',
    },
    {
      codigo: '790',
      descripcion: 'TARAZA',
      departamento_id: '05',
    },
    {
      codigo: '792',
      descripcion: 'TARSO',
      departamento_id: '05',
    },
    {
      codigo: '809',
      descripcion: 'TITIRIBI',
      departamento_id: '05',
    },
    {
      codigo: '819',
      descripcion: 'TOLEDO',
      departamento_id: '05',
    },
    {
      codigo: '837',
      descripcion: 'TURBO',
      departamento_id: '05',
    },
    {
      codigo: '842',
      descripcion: 'URAMITA',
      departamento_id: '05',
    },
    {
      codigo: '847',
      descripcion: 'URRAO',
      departamento_id: '05',
    },
    {
      codigo: '854',
      descripcion: 'VALDIVIA',
      departamento_id: '05',
    },
    {
      codigo: '856',
      descripcion: 'VALPARAISO',
      departamento_id: '05',
    },
    {
      codigo: '858',
      descripcion: 'VEGACHI',
      departamento_id: '05',
    },
    {
      codigo: '861',
      descripcion: 'VENECIA',
      departamento_id: '05',
    },
    {
      codigo: '873',
      descripcion: 'VIGIA DEL FUERTE',
      departamento_id: '05',
    },
    {
      codigo: '885',
      descripcion: 'YALI',
      departamento_id: '05',
    },
    {
      codigo: '887',
      descripcion: 'YARUMAL',
      departamento_id: '05',
    },
    {
      codigo: '890',
      descripcion: 'YOLOMBO',
      departamento_id: '05',
    },
    {
      codigo: '893',
      descripcion: 'YONDO',
      departamento_id: '05',
    },
    {
      codigo: '895',
      descripcion: 'ZARAGOZA',
      departamento_id: '05',
    },
    {
      codigo: '078',
      descripcion: 'BARANOA',
      departamento_id: '08',
    },
    {
      codigo: '137',
      descripcion: 'CAMPO DE LA CRUZ',
      departamento_id: '08',
    },
    {
      codigo: '141',
      descripcion: 'CANDELARIA',
      departamento_id: '08',
    },
    {
      codigo: '296',
      descripcion: 'GALAPA',
      departamento_id: '08',
    },
    {
      codigo: '372',
      descripcion: 'JUAN DE ACOSTA',
      departamento_id: '08',
    },
    {
      codigo: '421',
      descripcion: 'LURUACO',
      departamento_id: '08',
    },
    {
      codigo: '433',
      descripcion: 'MALAMBO',
      departamento_id: '08',
    },
    {
      codigo: '436',
      descripcion: 'MANATI',
      departamento_id: '08',
    },
    {
      codigo: '520',
      descripcion: 'PALMAR DE VARELA',
      departamento_id: '08',
    },
    {
      codigo: '549',
      descripcion: 'PIOJO',
      departamento_id: '08',
    },
    {
      codigo: '558',
      descripcion: 'POLONUEVO',
      departamento_id: '08',
    },
    {
      codigo: '560',
      descripcion: 'PONEDERA',
      departamento_id: '08',
    },
    {
      codigo: '573',
      descripcion: 'PUERTO COLOMBIA',
      departamento_id: '08',
    },
    {
      codigo: '606',
      descripcion: 'REPELON',
      departamento_id: '08',
    },
    {
      codigo: '634',
      descripcion: 'SABANAGRANDE',
      departamento_id: '08',
    },
    {
      codigo: '638',
      descripcion: 'SABANALARGA',
      departamento_id: '08',
    },
    {
      codigo: '675',
      descripcion: 'SANTA LUCIA',
      departamento_id: '08',
    },
    {
      codigo: '685',
      descripcion: 'SANTO TOMAS',
      departamento_id: '08',
    },
    {
      codigo: '758',
      descripcion: 'SOLEDAD',
      departamento_id: '08',
    },
    {
      codigo: '770',
      descripcion: 'SUAN',
      departamento_id: '08',
    },
    {
      codigo: '832',
      descripcion: 'TUBARA',
      departamento_id: '08',
    },
    {
      codigo: '849',
      descripcion: 'USIACURI',
      departamento_id: '08',
    },
    {
      codigo: '006',
      descripcion: 'ACHI',
      departamento_id: '13',
    },
    {
      codigo: '052',
      descripcion: 'ARJONA',
      departamento_id: '13',
    },
    {
      codigo: '062',
      descripcion: 'ARROYOHONDO',
      departamento_id: '13',
    },
    {
      codigo: '074',
      descripcion: 'BARRANCO DE LOBA',
      departamento_id: '13',
    },
    {
      codigo: '140',
      descripcion: 'CALAMAR',
      departamento_id: '13',
    },
    {
      codigo: '160',
      descripcion: 'CANTAGALLO',
      departamento_id: '13',
    },
    {
      codigo: '188',
      descripcion: 'CICUCO',
      departamento_id: '13',
    },
    {
      codigo: '222',
      descripcion: 'CLEMENCIA',
      departamento_id: '13',
    },
    {
      codigo: '244',
      descripcion: 'EL CARMEN DE BOLIVAR',
      departamento_id: '13',
    },
    {
      codigo: '248',
      descripcion: 'EL GUAMO',
      departamento_id: '13',
    },
    {
      codigo: '268',
      descripcion: 'EL PE\u00d1ON',
      departamento_id: '13',
    },
    {
      codigo: '300',
      descripcion: 'HATILLO DE LOBA',
      departamento_id: '13',
    },
    {
      codigo: '430',
      descripcion: 'MAGANGUE',
      departamento_id: '13',
    },
    {
      codigo: '442',
      descripcion: 'MARIA LA BAJA',
      departamento_id: '13',
    },
    {
      codigo: '458',
      descripcion: 'MONTECRISTO',
      departamento_id: '13',
    },
    {
      codigo: '468',
      descripcion: 'MOMPOS',
      departamento_id: '13',
    },
    {
      codigo: '473',
      descripcion: 'MORALES',
      departamento_id: '13',
    },
    {
      codigo: '580',
      descripcion: 'REGIDOR',
      departamento_id: '13',
    },
    {
      codigo: '600',
      descripcion: 'RIO VIEJO',
      departamento_id: '13',
    },
    {
      codigo: '620',
      descripcion: 'SAN CRISTOBAL',
      departamento_id: '13',
    },
    {
      codigo: '650',
      descripcion: 'SAN FERNANDO',
      departamento_id: '13',
    },
    {
      codigo: '654',
      descripcion: 'SAN JACINTO',
      departamento_id: '13',
    },
    {
      codigo: '655',
      descripcion: 'SAN JACINTO DEL CAUCA',
      departamento_id: '13',
    },
    {
      codigo: '657',
      descripcion: 'SAN JUAN NEPOMUCENO',
      departamento_id: '13',
    },
    {
      codigo: '673',
      descripcion: 'SANTA CATALINA',
      departamento_id: '13',
    },
    {
      codigo: '683',
      descripcion: 'SANTA ROSA',
      departamento_id: '13',
    },
    {
      codigo: '688',
      descripcion: 'SANTA ROSA DEL SUR',
      departamento_id: '13',
    },
    {
      codigo: '744',
      descripcion: 'SIMITI',
      departamento_id: '13',
    },
    {
      codigo: '760',
      descripcion: 'SOPLAVIENTO',
      departamento_id: '13',
    },
    {
      codigo: '780',
      descripcion: 'TALAIGUA NUEVO',
      departamento_id: '13',
    },
    {
      codigo: '810',
      descripcion: 'TIQUISIO',
      departamento_id: '13',
    },
    {
      codigo: '836',
      descripcion: 'TURBACO',
      departamento_id: '13',
    },
    {
      codigo: '838',
      descripcion: 'TURBANA',
      departamento_id: '13',
    },
    {
      codigo: '894',
      descripcion: 'ZAMBRANO',
      departamento_id: '13',
    },
    {
      codigo: '022',
      descripcion: 'ALMEIDA',
      departamento_id: '15',
    },
    {
      codigo: '047',
      descripcion: 'AQUITANIA',
      departamento_id: '15',
    },
    {
      codigo: '087',
      descripcion: 'BELEN',
      departamento_id: '15',
    },
    {
      codigo: '090',
      descripcion: 'BERBEO',
      departamento_id: '15',
    },
    {
      codigo: '092',
      descripcion: 'BETEITIVA',
      departamento_id: '15',
    },
    {
      codigo: '097',
      descripcion: 'BOAVITA',
      departamento_id: '15',
    },
    {
      codigo: '104',
      descripcion: 'BOYACA',
      departamento_id: '15',
    },
    {
      codigo: '106',
      descripcion: 'BRICE\u00d1O',
      departamento_id: '15',
    },
    {
      codigo: '109',
      descripcion: 'BUENAVISTA',
      departamento_id: '15',
    },
    {
      codigo: '114',
      descripcion: 'BUSBANZA',
      departamento_id: '15',
    },
    {
      codigo: '131',
      descripcion: 'CALDAS',
      departamento_id: '15',
    },
    {
      codigo: '135',
      descripcion: 'CAMPOHERMOSO',
      departamento_id: '15',
    },
    {
      codigo: '162',
      descripcion: 'CERINZA',
      departamento_id: '15',
    },
    {
      codigo: '176',
      descripcion: 'CHIQUINQUIRA',
      departamento_id: '15',
    },
    {
      codigo: '180',
      descripcion: 'CHISCAS',
      departamento_id: '15',
    },
    {
      codigo: '183',
      descripcion: 'CHITA',
      departamento_id: '15',
    },
    {
      codigo: '185',
      descripcion: 'CHITARAQUE',
      departamento_id: '15',
    },
    {
      codigo: '187',
      descripcion: 'CHIVATA',
      departamento_id: '15',
    },
    {
      codigo: '189',
      descripcion: 'CIENEGA',
      departamento_id: '15',
    },
    {
      codigo: '204',
      descripcion: 'COMBITA',
      departamento_id: '15',
    },
    {
      codigo: '215',
      descripcion: 'CORRALES',
      departamento_id: '15',
    },
    {
      codigo: '218',
      descripcion: 'COVARACHIA',
      departamento_id: '15',
    },
    {
      codigo: '223',
      descripcion: 'CUBARA',
      departamento_id: '15',
    },
    {
      codigo: '224',
      descripcion: 'CUCAITA',
      departamento_id: '15',
    },
    {
      codigo: '226',
      descripcion: 'CUITIVA',
      departamento_id: '15',
    },
    {
      codigo: '232',
      descripcion: 'CHIQUIZA',
      departamento_id: '15',
    },
    {
      codigo: '236',
      descripcion: 'CHIVOR',
      departamento_id: '15',
    },
    {
      codigo: '238',
      descripcion: 'DUITAMA',
      departamento_id: '15',
    },
    {
      codigo: '272',
      descripcion: 'FIRAVITOBA',
      departamento_id: '15',
    },
    {
      codigo: '276',
      descripcion: 'FLORESTA',
      departamento_id: '15',
    },
    {
      codigo: '293',
      descripcion: 'GACHANTIVA',
      departamento_id: '15',
    },
    {
      codigo: '299',
      descripcion: 'GARAGOA',
      departamento_id: '15',
    },
    {
      codigo: '317',
      descripcion: 'GUACAMAYAS',
      departamento_id: '15',
    },
    {
      codigo: '322',
      descripcion: 'GUATEQUE',
      departamento_id: '15',
    },
    {
      codigo: '325',
      descripcion: 'GUAYATA',
      departamento_id: '15',
    },
    {
      codigo: '332',
      descripcion: 'GsICAN',
      departamento_id: '15',
    },
    {
      codigo: '362',
      descripcion: 'IZA',
      departamento_id: '15',
    },
    {
      codigo: '367',
      descripcion: 'JENESANO',
      departamento_id: '15',
    },
    {
      codigo: '377',
      descripcion: 'LABRANZAGRANDE',
      departamento_id: '15',
    },
    {
      codigo: '401',
      descripcion: 'LA VICTORIA',
      departamento_id: '15',
    },
    {
      codigo: '403',
      descripcion: 'LA UVITA',
      departamento_id: '15',
    },
    {
      codigo: '407',
      descripcion: 'VILLA DE LEYVA',
      departamento_id: '15',
    },
    {
      codigo: '455',
      descripcion: 'MIRAFLORES',
      departamento_id: '15',
    },
    {
      codigo: '464',
      descripcion: 'MONGUA',
      departamento_id: '15',
    },
    {
      codigo: '466',
      descripcion: 'MONGUI',
      departamento_id: '15',
    },
    {
      codigo: '469',
      descripcion: 'MONIQUIRA',
      departamento_id: '15',
    },
    {
      codigo: '476',
      descripcion: 'MOTAVITA',
      departamento_id: '15',
    },
    {
      codigo: '491',
      descripcion: 'NOBSA',
      departamento_id: '15',
    },
    {
      codigo: '494',
      descripcion: 'NUEVO COLON',
      departamento_id: '15',
    },
    {
      codigo: '500',
      descripcion: 'OICATA',
      departamento_id: '15',
    },
    {
      codigo: '507',
      descripcion: 'OTANCHE',
      departamento_id: '15',
    },
    {
      codigo: '511',
      descripcion: 'PACHAVITA',
      departamento_id: '15',
    },
    {
      codigo: '514',
      descripcion: 'PAEZ',
      departamento_id: '15',
    },
    {
      codigo: '516',
      descripcion: 'PAIPA',
      departamento_id: '15',
    },
    {
      codigo: '518',
      descripcion: 'PAJARITO',
      departamento_id: '15',
    },
    {
      codigo: '522',
      descripcion: 'PANQUEBA',
      departamento_id: '15',
    },
    {
      codigo: '531',
      descripcion: 'PAUNA',
      departamento_id: '15',
    },
    {
      codigo: '533',
      descripcion: 'PAYA',
      departamento_id: '15',
    },
    {
      codigo: '537',
      descripcion: 'PAZ DE RIO',
      departamento_id: '15',
    },
    {
      codigo: '542',
      descripcion: 'PESCA',
      departamento_id: '15',
    },
    {
      codigo: '550',
      descripcion: 'PISBA',
      departamento_id: '15',
    },
    {
      codigo: '572',
      descripcion: 'PUERTO BOYACA',
      departamento_id: '15',
    },
    {
      codigo: '599',
      descripcion: 'RAMIRIQUI',
      departamento_id: '15',
    },
    {
      codigo: '621',
      descripcion: 'RONDON',
      departamento_id: '15',
    },
    {
      codigo: '632',
      descripcion: 'SABOYA',
      departamento_id: '15',
    },
    {
      codigo: '646',
      descripcion: 'SAMACA',
      departamento_id: '15',
    },
    {
      codigo: '676',
      descripcion: 'SAN MIGUEL DE SEMA',
      departamento_id: '15',
    },
    {
      codigo: '681',
      descripcion: 'SAN PABLO DE BORBUR',
      departamento_id: '15',
    },
    {
      codigo: '693',
      descripcion: 'SANTA ROSA DE VITERBO',
      departamento_id: '15',
    },
    {
      codigo: '696',
      descripcion: 'SANTA SOFIA',
      departamento_id: '15',
    },
    {
      codigo: '720',
      descripcion: 'SATIVANORTE',
      departamento_id: '15',
    },
    {
      codigo: '723',
      descripcion: 'SATIVASUR',
      departamento_id: '15',
    },
    {
      codigo: '740',
      descripcion: 'SIACHOQUE',
      departamento_id: '15',
    },
    {
      codigo: '753',
      descripcion: 'SOATA',
      departamento_id: '15',
    },
    {
      codigo: '755',
      descripcion: 'SOCOTA',
      departamento_id: '15',
    },
    {
      codigo: '757',
      descripcion: 'SOCHA',
      departamento_id: '15',
    },
    {
      codigo: '759',
      descripcion: 'SOGAMOSO',
      departamento_id: '15',
    },
    {
      codigo: '762',
      descripcion: 'SORA',
      departamento_id: '15',
    },
    {
      codigo: '763',
      descripcion: 'SOTAQUIRA',
      departamento_id: '15',
    },
    {
      codigo: '764',
      descripcion: 'SORACA',
      departamento_id: '15',
    },
    {
      codigo: '774',
      descripcion: 'SUSACON',
      departamento_id: '15',
    },
    {
      codigo: '776',
      descripcion: 'SUTAMARCHAN',
      departamento_id: '15',
    },
    {
      codigo: '778',
      descripcion: 'SUTATENZA',
      departamento_id: '15',
    },
    {
      codigo: '798',
      descripcion: 'TENZA',
      departamento_id: '15',
    },
    {
      codigo: '804',
      descripcion: 'TIBANA',
      departamento_id: '15',
    },
    {
      codigo: '806',
      descripcion: 'TIBASOSA',
      departamento_id: '15',
    },
    {
      codigo: '808',
      descripcion: 'TINJACA',
      departamento_id: '15',
    },
    {
      codigo: '814',
      descripcion: 'TOCA',
      departamento_id: '15',
    },
    {
      codigo: '816',
      descripcion: 'TOGsI',
      departamento_id: '15',
    },
    {
      codigo: '820',
      descripcion: 'TOPAGA',
      departamento_id: '15',
    },
    {
      codigo: '822',
      descripcion: 'TOTA',
      departamento_id: '15',
    },
    {
      codigo: '835',
      descripcion: 'TURMEQUE',
      departamento_id: '15',
    },
    {
      codigo: '839',
      descripcion: 'TUTAZA',
      departamento_id: '15',
    },
    {
      codigo: '879',
      descripcion: 'VIRACACHA',
      departamento_id: '15',
    },
    {
      codigo: '897',
      descripcion: 'ZETAQUIRA',
      departamento_id: '15',
    },
    {
      codigo: '013',
      descripcion: 'AGUADAS',
      departamento_id: '17',
    },
    {
      codigo: '050',
      descripcion: 'ARANZAZU',
      departamento_id: '17',
    },
    {
      codigo: '174',
      descripcion: 'CHINCHINA',
      departamento_id: '17',
    },
    {
      codigo: '388',
      descripcion: 'LA MERCED',
      departamento_id: '17',
    },
    {
      codigo: '444',
      descripcion: 'MARQUETALIA',
      departamento_id: '17',
    },
    {
      codigo: '446',
      descripcion: 'MARULANDA',
      departamento_id: '17',
    },
    {
      codigo: '486',
      descripcion: 'NEIRA',
      departamento_id: '17',
    },
    {
      codigo: '513',
      descripcion: 'PACORA',
      departamento_id: '17',
    },
    {
      codigo: '524',
      descripcion: 'PALESTINA',
      departamento_id: '17',
    },
    {
      codigo: '614',
      descripcion: 'RIOSUCIO',
      departamento_id: '17',
    },
    {
      codigo: '616',
      descripcion: 'RISARALDA',
      departamento_id: '17',
    },
    {
      codigo: '653',
      descripcion: 'SALAMINA',
      departamento_id: '17',
    },
    {
      codigo: '662',
      descripcion: 'SAMANA',
      departamento_id: '17',
    },
    {
      codigo: '777',
      descripcion: 'SUPIA',
      departamento_id: '17',
    },
    {
      codigo: '867',
      descripcion: 'VICTORIA',
      departamento_id: '17',
    },
    {
      codigo: '877',
      descripcion: 'VITERBO',
      departamento_id: '17',
    },
    {
      codigo: '029',
      descripcion: 'ALBANIA',
      departamento_id: '18',
    },
    {
      codigo: '094',
      descripcion: 'BELEN DE LOS ANDAQUIES',
      departamento_id: '18',
    },
    {
      codigo: '205',
      descripcion: 'CURILLO',
      departamento_id: '18',
    },
    {
      codigo: '247',
      descripcion: 'EL DONCELLO',
      departamento_id: '18',
    },
    {
      codigo: '256',
      descripcion: 'EL PAUJIL',
      departamento_id: '18',
    },
    {
      codigo: '410',
      descripcion: 'LA MONTA\u00d1ITA',
      departamento_id: '18',
    },
    {
      codigo: '460',
      descripcion: 'MILAN',
      departamento_id: '18',
    },
    {
      codigo: '479',
      descripcion: 'MORELIA',
      departamento_id: '18',
    },
    {
      codigo: '592',
      descripcion: 'PUERTO RICO',
      departamento_id: '18',
    },
    {
      codigo: '610',
      descripcion: 'SAN JOSE DEL FRAGUA',
      departamento_id: '18',
    },
    {
      codigo: '785',
      descripcion: 'SOLITA',
      departamento_id: '18',
    },
    {
      codigo: '860',
      descripcion: 'VALPARAISO',
      departamento_id: '18',
    },
    {
      codigo: '075',
      descripcion: 'BALBOA',
      departamento_id: '19',
    },
    {
      codigo: '100',
      descripcion: 'BOLIVAR',
      departamento_id: '19',
    },
    {
      codigo: '110',
      descripcion: 'BUENOS AIRES',
      departamento_id: '19',
    },
    {
      codigo: '130',
      descripcion: 'CAJIBIO',
      departamento_id: '19',
    },
    {
      codigo: '290',
      descripcion: 'FLORENCIA',
      departamento_id: '19',
    },
    {
      codigo: '355',
      descripcion: 'INZA',
      departamento_id: '19',
    },
    {
      codigo: '392',
      descripcion: 'LA SIERRA',
      departamento_id: '19',
    },
    {
      codigo: '397',
      descripcion: 'LA VEGA',
      departamento_id: '19',
    },
    {
      codigo: '418',
      descripcion: 'LOPEZ',
      departamento_id: '19',
    },
    {
      codigo: '450',
      descripcion: 'MERCADERES',
      departamento_id: '19',
    },
    {
      codigo: '517',
      descripcion: 'PAEZ',
      departamento_id: '19',
    },
    {
      codigo: '532',
      descripcion: 'PATIA',
      departamento_id: '19',
    },
    {
      codigo: '548',
      descripcion: 'PIENDAMO',
      departamento_id: '19',
    },
    {
      codigo: '622',
      descripcion: 'ROSAS',
      departamento_id: '19',
    },
    {
      codigo: '698',
      descripcion: 'SANTANDER DE QUILICHAO',
      departamento_id: '19',
    },
    {
      codigo: '701',
      descripcion: 'SANTA ROSA',
      departamento_id: '19',
    },
    {
      codigo: '743',
      descripcion: 'SILVIA',
      departamento_id: '19',
    },
    {
      codigo: '807',
      descripcion: 'TIMBIO',
      departamento_id: '19',
    },
    {
      codigo: '821',
      descripcion: 'TORIBIO',
      departamento_id: '19',
    },
    {
      codigo: '824',
      descripcion: 'TOTORO',
      departamento_id: '19',
    },
    {
      codigo: '845',
      descripcion: 'VILLA RICA',
      departamento_id: '19',
    },
    {
      codigo: '011',
      descripcion: 'AGUACHICA',
      departamento_id: '20',
    },
    {
      codigo: '032',
      descripcion: 'ASTREA',
      departamento_id: '20',
    },
    {
      codigo: '060',
      descripcion: 'BOSCONIA',
      departamento_id: '20',
    },
    {
      codigo: '175',
      descripcion: 'CHIMICHAGUA',
      departamento_id: '20',
    },
    {
      codigo: '178',
      descripcion: 'CHIRIGUANA',
      departamento_id: '20',
    },
    {
      codigo: '228',
      descripcion: 'CURUMANI',
      departamento_id: '20',
    },
    {
      codigo: '295',
      descripcion: 'GAMARRA',
      departamento_id: '20',
    },
    {
      codigo: '383',
      descripcion: 'LA GLORIA',
      departamento_id: '20',
    },
    {
      codigo: '443',
      descripcion: 'MANAURE',
      departamento_id: '20',
    },
    {
      codigo: '570',
      descripcion: 'PUEBLO BELLO',
      departamento_id: '20',
    },
    {
      codigo: '710',
      descripcion: 'SAN ALBERTO',
      departamento_id: '20',
    },
    {
      codigo: '750',
      descripcion: 'SAN DIEGO',
      departamento_id: '20',
    },
    {
      codigo: '787',
      descripcion: 'TAMALAMEQUE',
      departamento_id: '20',
    },
    {
      codigo: '068',
      descripcion: 'AYAPEL',
      departamento_id: '23',
    },
    {
      codigo: '168',
      descripcion: 'CHIMA',
      departamento_id: '23',
    },
    {
      codigo: '182',
      descripcion: 'CHINU',
      departamento_id: '23',
    },
    {
      codigo: '350',
      descripcion: 'LA APARTADA',
      departamento_id: '23',
    },
    {
      codigo: '417',
      descripcion: 'LORICA',
      departamento_id: '23',
    },
    {
      codigo: '419',
      descripcion: 'LOS CORDOBAS',
      departamento_id: '23',
    },
    {
      codigo: '555',
      descripcion: 'PLANETA RICA',
      departamento_id: '23',
    },
    {
      codigo: '574',
      descripcion: 'PUERTO ESCONDIDO',
      departamento_id: '23',
    },
    {
      codigo: '586',
      descripcion: 'PURISIMA',
      departamento_id: '23',
    },
    {
      codigo: '672',
      descripcion: 'SAN ANTERO',
      departamento_id: '23',
    },
    {
      codigo: '678',
      descripcion: 'SAN CARLOS',
      departamento_id: '23',
    },
    {
      codigo: '855',
      descripcion: 'VALENCIA',
      departamento_id: '23',
    },
    {
      codigo: '019',
      descripcion: 'ALBAN',
      departamento_id: '25',
    },
    {
      codigo: '035',
      descripcion: 'ANAPOIMA',
      departamento_id: '25',
    },
    {
      codigo: '053',
      descripcion: 'ARBELAEZ',
      departamento_id: '25',
    },
    {
      codigo: '095',
      descripcion: 'BITUIMA',
      departamento_id: '25',
    },
    {
      codigo: '099',
      descripcion: 'BOJACA',
      departamento_id: '25',
    },
    {
      codigo: '123',
      descripcion: 'CACHIPAY',
      departamento_id: '25',
    },
    {
      codigo: '126',
      descripcion: 'CAJICA',
      departamento_id: '25',
    },
    {
      codigo: '151',
      descripcion: 'CAQUEZA',
      departamento_id: '25',
    },
    {
      codigo: '181',
      descripcion: 'CHOACHI',
      departamento_id: '25',
    },
    {
      codigo: '200',
      descripcion: 'COGUA',
      departamento_id: '25',
    },
    {
      codigo: '214',
      descripcion: 'COTA',
      departamento_id: '25',
    },
    {
      codigo: '245',
      descripcion: 'EL COLEGIO',
      departamento_id: '25',
    },
    {
      codigo: '258',
      descripcion: 'EL PE\u00d1ON',
      departamento_id: '25',
    },
    {
      codigo: '260',
      descripcion: 'EL ROSAL',
      departamento_id: '25',
    },
    {
      codigo: '269',
      descripcion: 'FACATATIVA',
      departamento_id: '25',
    },
    {
      codigo: '279',
      descripcion: 'FOMEQUE',
      departamento_id: '25',
    },
    {
      codigo: '281',
      descripcion: 'FOSCA',
      departamento_id: '25',
    },
    {
      codigo: '286',
      descripcion: 'FUNZA',
      departamento_id: '25',
    },
    {
      codigo: '288',
      descripcion: 'FUQUENE',
      departamento_id: '25',
    },
    {
      codigo: '297',
      descripcion: 'GACHETA',
      departamento_id: '25',
    },
    {
      codigo: '307',
      descripcion: 'GIRARDOT',
      departamento_id: '25',
    },
    {
      codigo: '312',
      descripcion: 'GRANADA',
      departamento_id: '25',
    },
    {
      codigo: '320',
      descripcion: 'GUADUAS',
      departamento_id: '25',
    },
    {
      codigo: '324',
      descripcion: 'GUATAQUI',
      departamento_id: '25',
    },
    {
      codigo: '326',
      descripcion: 'GUATAVITA',
      departamento_id: '25',
    },
    {
      codigo: '328',
      descripcion: 'GUAYABAL DE SIQUIMA',
      departamento_id: '25',
    },
    {
      codigo: '335',
      descripcion: 'GUAYABETAL',
      departamento_id: '25',
    },
    {
      codigo: '339',
      descripcion: 'GUTIERREZ',
      departamento_id: '25',
    },
    {
      codigo: '386',
      descripcion: 'LA MESA',
      departamento_id: '25',
    },
    {
      codigo: '394',
      descripcion: 'LA PALMA',
      departamento_id: '25',
    },
    {
      codigo: '398',
      descripcion: 'LA PE\u00d1A',
      departamento_id: '25',
    },
    {
      codigo: '402',
      descripcion: 'LA VEGA',
      departamento_id: '25',
    },
    {
      codigo: '426',
      descripcion: 'MACHETA',
      departamento_id: '25',
    },
    {
      codigo: '438',
      descripcion: 'MEDINA',
      departamento_id: '25',
    },
    {
      codigo: '488',
      descripcion: 'NILO',
      departamento_id: '25',
    },
    {
      codigo: '489',
      descripcion: 'NIMAIMA',
      departamento_id: '25',
    },
    {
      codigo: '506',
      descripcion: 'VENECIA',
      departamento_id: '25',
    },
    {
      codigo: '530',
      descripcion: 'PARATEBUENO',
      departamento_id: '25',
    },
    {
      codigo: '535',
      descripcion: 'PASCA',
      departamento_id: '25',
    },
    {
      codigo: '594',
      descripcion: 'QUETAME',
      departamento_id: '25',
    },
    {
      codigo: '596',
      descripcion: 'QUIPILE',
      departamento_id: '25',
    },
    {
      codigo: '612',
      descripcion: 'RICAURTE',
      departamento_id: '25',
    },
    {
      codigo: '645',
      descripcion: 'SAN ANTONIO DEL TEQUENDAMA',
      departamento_id: '25',
    },
    {
      codigo: '718',
      descripcion: 'SASAIMA',
      departamento_id: '25',
    },
    {
      codigo: '745',
      descripcion: 'SIMIJACA',
      departamento_id: '25',
    },
    {
      codigo: '754',
      descripcion: 'SOACHA',
      departamento_id: '25',
    },
    {
      codigo: '769',
      descripcion: 'SUBACHOQUE',
      departamento_id: '25',
    },
    {
      codigo: '772',
      descripcion: 'SUESCA',
      departamento_id: '25',
    },
    {
      codigo: '779',
      descripcion: 'SUSA',
      departamento_id: '25',
    },
    {
      codigo: '781',
      descripcion: 'SUTATAUSA',
      departamento_id: '25',
    },
    {
      codigo: '793',
      descripcion: 'TAUSA',
      departamento_id: '25',
    },
    {
      codigo: '797',
      descripcion: 'TENA',
      departamento_id: '25',
    },
    {
      codigo: '799',
      descripcion: 'TENJO',
      departamento_id: '25',
    },
    {
      codigo: '805',
      descripcion: 'TIBACUY',
      departamento_id: '25',
    },
    {
      codigo: '815',
      descripcion: 'TOCAIMA',
      departamento_id: '25',
    },
    {
      codigo: '817',
      descripcion: 'TOCANCIPA',
      departamento_id: '25',
    },
    {
      codigo: '823',
      descripcion: 'TOPAIPI',
      departamento_id: '25',
    },
    {
      codigo: '841',
      descripcion: 'UBAQUE',
      departamento_id: '25',
    },
    {
      codigo: '843',
      descripcion: 'VILLA DE SAN DIEGO DE UBATE',
      departamento_id: '25',
    },
    {
      codigo: '851',
      descripcion: 'UTICA',
      departamento_id: '25',
    },
    {
      codigo: '862',
      descripcion: 'VERGARA',
      departamento_id: '25',
    },
    {
      codigo: '871',
      descripcion: 'VILLAGOMEZ',
      departamento_id: '25',
    },
    {
      codigo: '875',
      descripcion: 'VILLETA',
      departamento_id: '25',
    },
    {
      codigo: '878',
      descripcion: 'VIOTA',
      departamento_id: '25',
    },
    {
      codigo: '898',
      descripcion: 'ZIPACON',
      departamento_id: '25',
    },
    {
      codigo: '899',
      descripcion: 'ZIPAQUIRA',
      departamento_id: '25',
    },
    {
      codigo: '025',
      descripcion: 'ALTO BAUDO',
      departamento_id: '27',
    },
    {
      codigo: '073',
      descripcion: 'BAGADO',
      departamento_id: '27',
    },
    {
      codigo: '077',
      descripcion: 'BAJO BAUDO',
      departamento_id: '27',
    },
    {
      codigo: '413',
      descripcion: 'LLORO',
      departamento_id: '27',
    },
    {
      codigo: '800',
      descripcion: 'UNGUIA',
      departamento_id: '27',
    },
    {
      codigo: '016',
      descripcion: 'AIPE',
      departamento_id: '41',
    },
    {
      codigo: '020',
      descripcion: 'ALGECIRAS',
      departamento_id: '41',
    },
    {
      codigo: '026',
      descripcion: 'ALTAMIRA',
      departamento_id: '41',
    },
    {
      codigo: '132',
      descripcion: 'CAMPOALEGRE',
      departamento_id: '41',
    },
    {
      codigo: '298',
      descripcion: 'GARZON',
      departamento_id: '41',
    },
    {
      codigo: '319',
      descripcion: 'GUADALUPE',
      departamento_id: '41',
    },
    {
      codigo: '349',
      descripcion: 'HOBO',
      departamento_id: '41',
    },
    {
      codigo: '357',
      descripcion: 'IQUIRA',
      departamento_id: '41',
    },
    {
      codigo: '359',
      descripcion: 'ISNOS',
      departamento_id: '41',
    },
    {
      codigo: '378',
      descripcion: 'LA ARGENTINA',
      departamento_id: '41',
    },
    {
      codigo: '396',
      descripcion: 'LA PLATA',
      departamento_id: '41',
    },
    {
      codigo: '503',
      descripcion: 'OPORAPA',
      departamento_id: '41',
    },
    {
      codigo: '551',
      descripcion: 'PITALITO',
      departamento_id: '41',
    },
    {
      codigo: '668',
      descripcion: 'SAN AGUSTIN',
      departamento_id: '41',
    },
    {
      codigo: '791',
      descripcion: 'TARQUI',
      departamento_id: '41',
    },
    {
      codigo: '801',
      descripcion: 'TERUEL',
      departamento_id: '41',
    },
    {
      codigo: '872',
      descripcion: 'VILLAVIEJA',
      departamento_id: '41',
    },
    {
      codigo: '098',
      descripcion: 'DISTRACCION',
      departamento_id: '44',
    },
    {
      codigo: '420',
      descripcion: 'LA JAGUA DEL PILAR',
      departamento_id: '44',
    },
    {
      codigo: '874',
      descripcion: 'VILLANUEVA',
      departamento_id: '44',
    },
    {
      codigo: '058',
      descripcion: 'ARIGUANI',
      departamento_id: '47',
    },
    {
      codigo: '161',
      descripcion: 'CERRO SAN ANTONIO',
      departamento_id: '47',
    },
    {
      codigo: '170',
      descripcion: 'CHIBOLO',
      departamento_id: '47',
    },
    {
      codigo: '545',
      descripcion: 'PIJI\u00d1O DEL CARMEN',
      departamento_id: '47',
    },
    {
      codigo: '605',
      descripcion: 'REMOLINO',
      departamento_id: '47',
    },
    {
      codigo: '692',
      descripcion: 'SAN SEBASTIAN DE BUENAVISTA',
      departamento_id: '47',
    },
    {
      codigo: '703',
      descripcion: 'SAN ZENON',
      departamento_id: '47',
    },
    {
      codigo: '707',
      descripcion: 'SANTA ANA',
      departamento_id: '47',
    },
    {
      codigo: '960',
      descripcion: 'ZAPAYAN',
      departamento_id: '47',
    },
    {
      codigo: '980',
      descripcion: 'ZONA BANANERA',
      departamento_id: '47',
    },
    {
      codigo: '124',
      descripcion: 'CABUYARO',
      departamento_id: '50',
    },
    {
      codigo: '251',
      descripcion: 'EL CASTILLO',
      departamento_id: '50',
    },
    {
      codigo: '270',
      descripcion: 'EL DORADO',
      departamento_id: '50',
    },
    {
      codigo: '287',
      descripcion: 'FUENTE DE ORO',
      departamento_id: '50',
    },
    {
      codigo: '330',
      descripcion: 'MESETAS',
      departamento_id: '50',
    },
    {
      codigo: '370',
      descripcion: 'URIBE',
      departamento_id: '50',
    },
    {
      codigo: '568',
      descripcion: 'PUERTO GAITAN',
      departamento_id: '50',
    },
    {
      codigo: '577',
      descripcion: 'PUERTO LLERAS',
      departamento_id: '50',
    },
    {
      codigo: '590',
      descripcion: 'PUERTO RICO',
      departamento_id: '50',
    },
    {
      codigo: '680',
      descripcion: 'SAN CARLOS DE GUAROA',
      departamento_id: '50',
    },
    {
      codigo: '689',
      descripcion: 'SAN MARTIN',
      departamento_id: '50',
    },
    {
      codigo: '711',
      descripcion: 'VISTAHERMOSA',
      departamento_id: '50',
    },
    {
      codigo: '083',
      descripcion: 'BELEN',
      departamento_id: '52',
    },
    {
      codigo: '203',
      descripcion: 'COLON',
      departamento_id: '52',
    },
    {
      codigo: '207',
      descripcion: 'CONSACA',
      departamento_id: '52',
    },
    {
      codigo: '210',
      descripcion: 'CONTADERO',
      departamento_id: '52',
    },
    {
      codigo: '227',
      descripcion: 'CUMBAL',
      departamento_id: '52',
    },
    {
      codigo: '233',
      descripcion: 'CUMBITARA',
      departamento_id: '52',
    },
    {
      codigo: '254',
      descripcion: 'EL PE\u00d1OL',
      departamento_id: '52',
    },
    {
      codigo: '323',
      descripcion: 'GUALMATAN',
      departamento_id: '52',
    },
    {
      codigo: '352',
      descripcion: 'ILES',
      departamento_id: '52',
    },
    {
      codigo: '354',
      descripcion: 'IMUES',
      departamento_id: '52',
    },
    {
      codigo: '356',
      descripcion: 'IPIALES',
      departamento_id: '52',
    },
    {
      codigo: '381',
      descripcion: 'LA FLORIDA',
      departamento_id: '52',
    },
    {
      codigo: '385',
      descripcion: 'LA LLANADA',
      departamento_id: '52',
    },
    {
      codigo: '399',
      descripcion: 'LA UNION',
      departamento_id: '52',
    },
    {
      codigo: '405',
      descripcion: 'LEIVA',
      departamento_id: '52',
    },
    {
      codigo: '427',
      descripcion: 'MAGsI',
      departamento_id: '52',
    },
    {
      codigo: '435',
      descripcion: 'MALLAMA',
      departamento_id: '52',
    },
    {
      codigo: '540',
      descripcion: 'POLICARPA',
      departamento_id: '52',
    },
    {
      codigo: '565',
      descripcion: 'PROVIDENCIA',
      departamento_id: '52',
    },
    {
      codigo: '687',
      descripcion: 'SAN LORENZO',
      departamento_id: '52',
    },
    {
      codigo: '694',
      descripcion: 'SAN PEDRO DE CARTAGO',
      departamento_id: '52',
    },
    {
      codigo: '699',
      descripcion: 'SANTACRUZ',
      departamento_id: '52',
    },
    {
      codigo: '786',
      descripcion: 'TAMINANGO',
      departamento_id: '52',
    },
    {
      codigo: '788',
      descripcion: 'TANGUA',
      departamento_id: '52',
    },
    {
      codigo: '003',
      descripcion: 'ABREGO',
      departamento_id: '54',
    },
    {
      codigo: '128',
      descripcion: 'CACHIRA',
      departamento_id: '54',
    },
    {
      codigo: '239',
      descripcion: 'DURANIA',
      departamento_id: '54',
    },
    {
      codigo: '261',
      descripcion: 'EL ZULIA',
      departamento_id: '54',
    },
    {
      codigo: '344',
      descripcion: 'HACARI',
      departamento_id: '54',
    },
    {
      codigo: '498',
      descripcion: 'OCA\u00d1A',
      departamento_id: '54',
    },
    {
      codigo: '553',
      descripcion: 'PUERTO SANTANDER',
      departamento_id: '54',
    },
    {
      codigo: '111',
      descripcion: 'BUENAVISTA',
      departamento_id: '63',
    },
    {
      codigo: '302',
      descripcion: 'GENOVA',
      departamento_id: '63',
    },
    {
      codigo: '470',
      descripcion: 'MONTENEGRO',
      departamento_id: '63',
    },
    {
      codigo: '456',
      descripcion: 'MISTRATO',
      departamento_id: '66',
    },
    {
      codigo: '682',
      descripcion: 'SANTA ROSA DE CABAL',
      departamento_id: '66',
    },
    {
      codigo: '081',
      descripcion: 'BARRANCABERMEJA',
      departamento_id: '68',
    },
    {
      codigo: '121',
      descripcion: 'CABRERA',
      departamento_id: '68',
    },
    {
      codigo: '152',
      descripcion: 'CARCASI',
      departamento_id: '68',
    },
    {
      codigo: '167',
      descripcion: 'CHARALA',
      departamento_id: '68',
    },
    {
      codigo: '169',
      descripcion: 'CHARTA',
      departamento_id: '68',
    },
    {
      codigo: '179',
      descripcion: 'CHIPATA',
      departamento_id: '68',
    },
    {
      codigo: '211',
      descripcion: 'CONTRATACION',
      departamento_id: '68',
    },
    {
      codigo: '217',
      descripcion: 'COROMORO',
      departamento_id: '68',
    },
    {
      codigo: '229',
      descripcion: 'CURITI',
      departamento_id: '68',
    },
    {
      codigo: '235',
      descripcion: 'EL CARMEN DE CHUCURI',
      departamento_id: '68',
    },
    {
      codigo: '255',
      descripcion: 'EL PLAYON',
      departamento_id: '68',
    },
    {
      codigo: '271',
      descripcion: 'FLORIAN',
      departamento_id: '68',
    },
    {
      codigo: '327',
      descripcion: 'GsEPSA',
      departamento_id: '68',
    },
    {
      codigo: '406',
      descripcion: 'LEBRIJA',
      departamento_id: '68',
    },
    {
      codigo: '432',
      descripcion: 'MALAGA',
      departamento_id: '68',
    },
    {
      codigo: '502',
      descripcion: 'ONZAGA',
      departamento_id: '68',
    },
    {
      codigo: '547',
      descripcion: 'PIEDECUESTA',
      departamento_id: '68',
    },
    {
      codigo: '575',
      descripcion: 'PUERTO WILCHES',
      departamento_id: '68',
    },
    {
      codigo: '669',
      descripcion: 'SAN ANDRES',
      departamento_id: '68',
    },
    {
      codigo: '684',
      descripcion: 'SAN JOSE DE MIRANDA',
      departamento_id: '68',
    },
    {
      codigo: '705',
      descripcion: 'SANTA BARBARA',
      departamento_id: '68',
    },
    {
      codigo: '773',
      descripcion: 'SUCRE',
      departamento_id: '68',
    },
    {
      codigo: '221',
      descripcion: 'COVE\u00d1AS',
      departamento_id: '70',
    },
    {
      codigo: '230',
      descripcion: 'CHALAN',
      departamento_id: '70',
    },
    {
      codigo: '265',
      descripcion: 'GUARANDA',
      departamento_id: '70',
    },
    {
      codigo: '429',
      descripcion: 'MAJAGUAL',
      departamento_id: '70',
    },
    {
      codigo: '508',
      descripcion: 'OVEJAS',
      departamento_id: '70',
    },
    {
      codigo: '523',
      descripcion: 'PALMITO',
      departamento_id: '70',
    },
    {
      codigo: '702',
      descripcion: 'SAN JUAN DE BETULIA',
      departamento_id: '70',
    },
    {
      codigo: '708',
      descripcion: 'SAN MARCOS',
      departamento_id: '70',
    },
    {
      codigo: '713',
      descripcion: 'SAN ONOFRE',
      departamento_id: '70',
    },
    {
      codigo: '717',
      descripcion: 'SAN PEDRO',
      departamento_id: '70',
    },
    {
      codigo: '742',
      descripcion: 'SAN LUIS DE SINCE',
      departamento_id: '70',
    },
    {
      codigo: '771',
      descripcion: 'SUCRE',
      departamento_id: '70',
    },
    {
      codigo: '024',
      descripcion: 'ALPUJARRA',
      departamento_id: '73',
    },
    {
      codigo: '043',
      descripcion: 'ANZOATEGUI',
      departamento_id: '73',
    },
    {
      codigo: '067',
      descripcion: 'ATACO',
      departamento_id: '73',
    },
    {
      codigo: '275',
      descripcion: 'FLANDES',
      departamento_id: '73',
    },
    {
      codigo: '283',
      descripcion: 'FRESNO',
      departamento_id: '73',
    },
    {
      codigo: '408',
      descripcion: 'LERIDA',
      departamento_id: '73',
    },
    {
      codigo: '449',
      descripcion: 'MELGAR',
      departamento_id: '73',
    },
    {
      codigo: '461',
      descripcion: 'MURILLO',
      departamento_id: '73',
    },
    {
      codigo: '504',
      descripcion: 'ORTEGA',
      departamento_id: '73',
    },
    {
      codigo: '563',
      descripcion: 'PRADO',
      departamento_id: '73',
    },
    {
      codigo: '624',
      descripcion: 'ROVIRA',
      departamento_id: '73',
    },
    {
      codigo: '671',
      descripcion: 'SALDA\u00d1A',
      departamento_id: '73',
    },
    {
      codigo: '870',
      descripcion: 'VILLAHERMOSA',
      departamento_id: '73',
    },
    {
      codigo: '041',
      descripcion: 'ANSERMANUEVO',
      departamento_id: '76',
    },
    {
      codigo: '054',
      descripcion: 'ARGELIA',
      departamento_id: '76',
    },
    {
      codigo: '122',
      descripcion: 'CAICEDONIA',
      departamento_id: '76',
    },
    {
      codigo: '243',
      descripcion: 'EL AGUILA',
      departamento_id: '76',
    },
    {
      codigo: '246',
      descripcion: 'EL CAIRO',
      departamento_id: '76',
    },
    {
      codigo: '497',
      descripcion: 'OBANDO',
      departamento_id: '76',
    },
    {
      codigo: '828',
      descripcion: 'TRUJILLO',
      departamento_id: '76',
    },
    {
      codigo: '834',
      descripcion: 'TULUA',
      departamento_id: '76',
    },
    {
      codigo: '863',
      descripcion: 'VERSALLES',
      departamento_id: '76',
    },
    {
      codigo: '869',
      descripcion: 'VIJES',
      departamento_id: '76',
    },
    {
      codigo: '892',
      descripcion: 'YUMBO',
      departamento_id: '76',
    },
    {
      codigo: '065',
      descripcion: 'ARAUQUITA',
      departamento_id: '81',
    },
    {
      codigo: '220',
      descripcion: 'CRAVO NORTE',
      departamento_id: '81',
    },
    {
      codigo: '794',
      descripcion: 'TAME',
      departamento_id: '81',
    },
    {
      codigo: '010',
      descripcion: 'AGUAZUL',
      departamento_id: '85',
    },
    {
      codigo: '015',
      descripcion: 'CHAMEZA',
      departamento_id: '85',
    },
    {
      codigo: '136',
      descripcion: 'LA SALINA',
      departamento_id: '85',
    },
    {
      codigo: '139',
      descripcion: 'MANI',
      departamento_id: '85',
    },
    {
      codigo: '225',
      descripcion: 'NUNCHIA',
      departamento_id: '85',
    },
    {
      codigo: '263',
      descripcion: 'PORE',
      departamento_id: '85',
    },
    {
      codigo: '219',
      descripcion: 'COLON',
      departamento_id: '86',
    },
    {
      codigo: '569',
      descripcion: 'PUERTO CAICEDO',
      departamento_id: '86',
    },
    {
      codigo: '571',
      descripcion: 'PUERTO GUZMAN',
      departamento_id: '86',
    },
    {
      codigo: '749',
      descripcion: 'SIBUNDOY',
      departamento_id: '86',
    },
    {
      codigo: '865',
      descripcion: 'VALLE DEL GUAMUEZ',
      departamento_id: '86',
    },
    {
      codigo: '564',
      descripcion: 'PROVIDENCIA',
      departamento_id: '88',
    },
    {
      codigo: '536',
      descripcion: 'PUERTO ARICA',
      departamento_id: '91',
    },
    {
      codigo: '343',
      descripcion: 'BARRANCO MINAS',
      departamento_id: '94',
    },
    {
      codigo: '663',
      descripcion: 'MAPIRIPANA',
      departamento_id: '94',
    },
    {
      codigo: '883',
      descripcion: 'SAN FELIPE',
      departamento_id: '94',
    },
    {
      codigo: '884',
      descripcion: 'PUERTO COLOMBIA',
      departamento_id: '94',
    },
    {
      codigo: '886',
      descripcion: 'CACAHUAL',
      departamento_id: '94',
    },
    {
      codigo: '888',
      descripcion: 'MORICHAL',
      departamento_id: '94',
    },
    {
      codigo: '666',
      descripcion: 'TARAIRA',
      departamento_id: '97',
    },
    {
      codigo: '889',
      descripcion: 'YAVARATE',
      departamento_id: '97',
    },
  ];

  // reemplazar el departamento_id por el id de la tabla departamentos, ya que es el código!
  await prisma.departamentos.findMany().then(async (departamentos) => {
    for (let i = 0; i < departamentos.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (departamentos[i].codigo === data[j].departamento_id) {
          data[j].departamento_id = departamentos[i].id;
        }
      }
    }
  });

  return data as Prisma.CiudadesCreateManyInput[];
}
