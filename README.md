# Template de API REST con Nest.js y Prisma con Seguridad

# Instalación

```bash
npm install
```

# Crear la base de datos

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma db push
```

# Poblar la base de datos

```bash
npx prisma db seed
```

# Iniciar el servidor modo hot reload

```bash
npm run watch
```

```bash
npm run start:dev
```

# URL DE DOCUMENTACIÓN DE SWAGGER

```bash
http://127.0.0.1:3000/
```

# Estructura de archivos

```
Proyecto 
├── backups (Carpeta de respaldos) 
├── examples (Ejemplos de módulos de la aplicación) 
├── logs (Carpeta de logs de la aplicación) 
├── prisma (Carpeta de prisma, que contiene los archivos de configuración de la base de datos) 
│ ├── schema (Esquema de la base de datos, se puede separar en diferentes archivos) 
│ └── seeders (Datos de prueba para la base de datos) 
├── src 
│ ├── constants (Definición de constantes de la aplicación) 
│ ├── context (Contextos de la aplicación, como autenticación, geolocalización, etc.) 
│ │ ├── auth (Módulo de autenticación) 
│ │ │ ├── jwt 
│ │ │ ├── permiso 
│ │ │ ├── roles 
│ │ │ └── usuarios 
│ │ ├── geolocalizacion (Módulo de geolocalización) 
│ │ │ ├── ciudades 
│ │ │ ├── departamentos 
│ │ │ └── paises 
│ │ ├── mails (Módulo de envío de correos) 
│ │ │ └── templates 
│ ├── logs (Configuración de logs) 
│ ├── prisma (Módulo de prisma, que se usa para la conexión a la base de datos) 
│ ├── tasks 
│ └── utils (Funciones de utilidades que se usan en toda la aplicación) 
└── uploads (Carpeta donde se almacenaran los archivos, revisar /examples/submitFiles) 
```

# Activar/Desactivar Middleware de Seguridad o Permisos

Para activar o desactivar el middleware de seguridad o permisos, se debe modificar el archivo `src/app.module.ts`, en ella encontraras las siguientes lineas de código:

```javascript
// Hacer que los Endpoints estén protegidos por el guard de autenticación
{
  provide: APP_GUARD,
  useClass: AuthGuard,
},
// Hacer que los Endpoints estén protegidos por el guard de permisos
{
  provide: APP_GUARD,
  useClass: PermisosGuard,
},
```

Para desactivar el guard de autenticación, se debe comentar la linea de código que lo activa, de la siguiente manera:

```javascript
// Hacer que los Endpoints estén protegidos por el guard de autenticación
// {
//   provide: APP_GUARD,
//   useClass: AuthGuard,
// },
```

Para desactivar el guard de permisos, se debe comentar la linea de código que lo activa, de la siguiente manera:

```javascript
// Hacer que los Endpoints estén protegidos por el guard de permisos
// {
//   provide: APP_GUARD,
//   useClass: PermisosGuard,
// },
```

# Variables de Entorno

Para configurar las variables de entorno, se debe crear un archivo `.env` en la raíz del proyecto, en ella se deben definir las siguientes variables:

```bash
# APP

APP_PORT=3000
APP_NAME="Plantilla NestJS Con Seguridad"

# CONEXIÓN A LA BASE DE DATOS

DB_PORT=puerto_de_postgres
DB_HOST=direcion_de_postgres
DB_PASSWORD=contraseña_de_acceso_de_postgres
DB_USER=usuario_de_acceso_a_postgres
DB_DATABASE=nombre_base_de_datos_postgres

DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}"

# JWT SECRET KEY

JWT_SECRET=""
JWT_REFRESH_SECRET=""

# SISTEMA DE CORREOS

MAIL_HOST=smtp.gmail.com
MAIL_USER=TUCORREO
# https://myaccount.google.com/apppasswords
MAIL_PASSWORD="CONTRASEÑA_DE_APLICACION DE MAIL USER DE APP PASSWORDS"
MAIL_FROM="elcorreo"

# CONFIGURACIÓN DE ROL POR DEFECTO

ROL_ID_POR_DEFECTO=1
ROL_NOMBRE_POR_DEFECTO="Ciudadano"

# CONFIGURACIÓN DE GOOGLE

WEB_CLIENT_ID_GOOGLE=""

# SAVING FILES

MAX_FILE_SIZE_IN_MB=2
```

Rutas para cada tabla

Cada tabla del modelo entidad relación establecida en el manual técnico contiene tiene 6 rutas básicas protegidas en base a los permisos que se tengan sobre la tabla. Es decir, si un usuario tiene permisos de lectura sobre una tabla, podrá acceder a las rutas de lectura de la tabla. Si tiene permisos de escritura, podrá acceder a las rutas de escritura de la tabla. Si tiene permisos de lectura y escritura, podrá acceder a todas las rutas de la tabla.

La unica excepción es la eliminación, ya que solo deshabilita el registro en la base de datos, pero no lo elimina físicamente, por lo que solo los usuarios con permisos de eliminación podrán acceder a la ruta de eliminación. Y para la obtención se datos solo se obtendrán los registros que no estén deshabilitados.

[GET] /paginated/{page}/{itemsPerPage}?includedDeleted=true|false: Es para obtener los registros de la tabla de forma paginada. Se debe enviar el número de página y la cantidad de registros por página. Adicionalmente se puede enviar un filtro en la url para obtener los registros que no estén deshabilitados.

[GET] /?includedDeleted=true|false: Es para obtener todos los registros de la tabla. Adicionalmente se puede enviar un filtro en la url para obtener los registros que no estén deshabilitados.

[POST] / : Es para crear un nuevo registro en la tabla, se requiere enviar los datos del registro en el cuerpo de la petición de acuerdo a lo explicado en el diccionario de datos establecido en el manual técnico.

[GET] /{id}: Es para obtener un registro en específico de la tabla. Se debe enviar el id del registro en la url.

[PUT] /{id}: Es para actualizar un registro en específico de la tabla. Se debe enviar el id del registro en la url y los datos a actualizar en el cuerpo de la petición de acuerdo a lo explicado en el diccionario de datos establecido en el manual técnico.

[DELETE] /{id}: Es para deshabilitar un registro en específico de la tabla. Se debe enviar el id del registro en la url.