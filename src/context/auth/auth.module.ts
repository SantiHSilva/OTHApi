import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PermisosModule } from './permiso/permisos.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [PermisosModule, RolesModule, UsuariosModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
