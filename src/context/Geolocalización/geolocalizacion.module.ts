import { Module } from '@nestjs/common';
import { PaisesModule } from './paises/paises.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { DepartamentosModule } from './departamentos/departamentos.module';

@Module({
  imports: [
    PaisesModule,
    CiudadesModule,
    DepartamentosModule,
  ],
})
export class GeolocalizacionModule {}
