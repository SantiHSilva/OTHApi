import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { RequestLoggerMiddleware } from './logs/request-logger.middleware';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './context/auth/auth.module';
import { AuthGuard } from './context/auth/auth.guard';
import { PermisosGuard } from './context/auth/permiso/permisos.guard';
import { PrismaService } from './prisma/prisma.service';
import { GeolocalizacionModule } from './context/Geolocalización/geolocalizacion.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/taskService.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Configuración de variables de entorno
    ScheduleModule.forRoot(), // Programación de tareas, BACKUPs en este caso.
    PrismaModule,
    AuthModule,
    GeolocalizacionModule,
  ],
  providers: [
    PrismaService,
    TasksService,
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
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
