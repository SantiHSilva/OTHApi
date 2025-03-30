import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTApplicationService } from './jwt.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      verifyOptions: {
        ignoreExpiration: true,
      },
    }),
  ],
  providers: [JWTApplicationService],
  exports: [JWTApplicationService],
})
export class JWTApplicationModule {}
