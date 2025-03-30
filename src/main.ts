import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initializeSwagger from './swagger';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import logger from './logs/winston.logger';
import { syncPerms } from './context/auth/permiso/permisos.strategy';

async function bootstrap() {
  // Crear la aplicación con el logger.
  const app = await NestFactory.create(AppModule, { logger });

  // Protección de cabeceras de helmet: https://github.com/helmetjs/helmet?tab=readme-ov-file#helmet
  app.use(helmet());

  // Habilitar CORS
  app.enableCors({
    origin: '*',
  });

  // Modificar el límite de carga de archivos
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  // Permisos
  await syncPerms();

  // Iniciar Swagger
  initializeSwagger(app);

  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
