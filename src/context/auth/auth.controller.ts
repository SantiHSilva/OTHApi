import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  GoogleAccessToken,
  GoogleAccessTokenRegister,
  JWTRefresh,
  JWTToken,
  Login,
  Register,
  RequestEmailOperation,
  ResetPassword,
} from './auth.model';
import { Public } from '../../constants/constants';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('logout')
  async logout(@Body() token: JWTToken) {
    return this.service.blackListToken(token);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() token: JWTRefresh) {
    return this.service.refreshAccessToken(token);
  }

  @Public()
  @Post('register')
  @ApiOperation({
    description: 'Crea un usuario en la base de datos',
    summary: 'Registro de usuario',
  })
  async register(@Body() data: Register) {
    return this.service.register(data);
  }

  @Public()
  @ApiOperation({
    description:
      'Inicia sesión en la aplicación utilizando un correo y contraseña',
    summary: 'Inicio de sesión',
  })
  @Post('login')
  async login(@Body() data: Login) {
    return this.service.login(data);
  }

  @ApiOperation({
    description: 'Obtener información del usuario autenticado',
    summary: 'Información del perfil',
  })
  @Get('profile')
  async profile(@Request() req) {
    const idUser = req.user.idUser;
    return this.service.profile(idUser);
  }

  @Public()
  @ApiOperation({
    description:
      'Envía un correo de verificación a la cuenta del usuario, si no ha sido verificada',
    summary: 'Envío de correo de verificación',
  })
  @Post('sendVerification')
  async sendVerification(
    @Headers() headers: ParameterDecorator,
    @Body() data: RequestEmailOperation,
  ) {
    return this.service.sendVerificationAccount(headers, data);
  }

  @Public()
  @ApiOperation({
    description: 'Verifica la cuenta de usuario con el token enviado al correo',
    summary: 'Verificación de cuenta',
  })
  @Get('checkVerification/:token')
  async checkVerification(@Param('token') token: string) {
    return this.service.verifyAccountWitToken(token);
  }

  @Public()
  @ApiOperation({
    description: 'Envía un correo con un enlace para restablecer la contraseña',
    summary: 'Envío de correo de reinicio de contraseña',
  })
  @Post('sendResetPassword')
  async sendResetPassword(
    @Headers() headers: ParameterDecorator,
    @Body() data: RequestEmailOperation,
  ) {
    return this.service.sendResetPassword(headers, data);
  }

  @Public()
  @Post('resetPassword')
  @ApiOperation({
    description:
      'Restablece la contraseña del usuario, el token es enviado al correo',
    summary: 'Restablecimiento de contraseña',
  })
  async resetPassword(@Body() data: ResetPassword) {
    return this.service.resetPassword(data);
  }

  @Public()
  @ApiOperation({
    description:
      'Inicia sesión en la aplicación utilizando un token de Google, si no existe el usuario debe registrarse en google/register',
    summary: 'Inicio de sesión con Google',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario no existe, debe registrarse',
  })
  @Post('google')
  async googleOAuth(@Body() data: GoogleAccessToken) {
    return this.service.OAuthGoogle(data);
  }

  @Public()
  @Post('google/register')
  @ApiOperation({
    description:
      'Registra rapidamente un usuario en la aplicación utilizando un token de Google',
    summary: 'Registro rapido de usuario con Google',
  })
  async googleRegister(@Body() data: GoogleAccessTokenRegister) {
    return this.service.OAuthGoogleRegister(data);
  }
}
