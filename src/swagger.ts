import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const DOCUMENTACION = {
  title: 'API De Ejemplo',
  description: 'Documentación de la API de ejemplo',
  version: '0.0',
  pathSwagger: '',
};

export default function initializeSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(DOCUMENTACION.title)
    .setDescription(DOCUMENTACION.description)
    .setVersion(DOCUMENTACION.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOCUMENTACION.pathSwagger, app, document);
}
