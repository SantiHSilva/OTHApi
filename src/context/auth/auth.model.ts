import { ApiProperty } from '@nestjs/swagger';

export class RequestEmailOperation {
  @ApiProperty({
    example: 'observatorio.transito.transporte@gmail.com',
    description: 'Correo electrónico utilizado para autenticación.',
  })
  email: string;

  @ApiProperty({
    example: 'http://localhost:3000/reset-password',
    description: 'URL de redirección para reinicio de contraseña.',
  })
  redirectTo: string;
}

export interface PropsAccount {
  name: string;
  email: string;
  token: {
    token: string;
    expiresIn: number;
  };
  headers: any;
  redirectUrl: string;
}

export class Register {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario.',
  })
  nombre: string;

  @ApiProperty({
    example: 'Perez',
    description: 'Apellido del usuario.',
  })
  apellido: string;

  @ApiProperty({
    example: true,
    description:
      'Referencia al sexo biológico de la persona, true para masculino y false para femenino.',
  })
  sexo: boolean;

  @ApiProperty({
    example: 0,
    description: 'Referencia al país que reside el usuario',
  })
  nacionalidad_id: number;

  @ApiProperty({
    example: '0000000000',
    description: 'Número de teléfono de contacto.',
  })
  telefono: string;

  @ApiProperty({
    example: 'Calle 123 # 45-67',
    description: 'Dirección de notificación para correspondencias oficiales.',
  })
  direccion_notificacion: string;

  @ApiProperty({
    example: 'Calle 123 # 45-67',
    description: 'Dirección residencial del ciudadano.',
  })
  direccion_domicilio: string;

  @ApiProperty({
    example: 'observatorio.transito.transporte@gmail.com',
    description: 'Correo electrónico utilizado para autenticación.',
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña sin encriptar del usuario.',
  })
  password: string;
}

export class Login {
  @ApiProperty({
    example: 'observatorio.transito.transporte@gmail.com',
    description: 'Correo electrónico utilizado para autenticación.',
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña sin encriptar del usuario.',
  })
  password: string;
}

export class ResetPassword {
  @ApiProperty({
    example: '123456',
    description: 'Contraseña sin encriptar del usuario.',
  })
  newPassword: string;

  @ApiProperty({
    example: '',
    description: 'Token de reinicio de contraseña.',
  })
  token: string;
}

export class GoogleAccessToken {
  @ApiProperty({
    example: '',
    description: 'Token de acceso de Google',
  })
  idToken: string;
}

export class GoogleAccessTokenRegister extends GoogleAccessToken {
  @ApiProperty({
    example: true,
    description:
      'Sexo de la persona, true para masculino y false para femenino.',
  })
  sexo: boolean;

  @ApiProperty({
    example: 0,
    description: 'Referencia al país que reside el usuario',
  })
  nacionalidad_id: number;
}

export class JWTRefresh {
  @ApiProperty({
    example: '',
    description: 'Token de actualización JWT',
  })
  refreshToken: string;
}

export class JWTToken extends JWTRefresh {
  @ApiProperty({
    example: '',
    description: 'Token de acceso JWT',
  })
  accessToken: string;
}
