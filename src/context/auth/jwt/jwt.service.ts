import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

const accessTokenExpiresIn = '7d';
const refreshTokenExpiresIn = '7d';

@Injectable()
export class JWTApplicationService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async blacklistToken(token: string, expiresIn: number) {
    await this.clearTokensExpired();

    if (await this.isBlacklisted(token)) return;

    await this.prisma.jWTBlacklist.create({
      data: {
        token,
        expiracion: new Date(expiresIn),
      },
    });
  }

  async isBlacklisted(token: string): Promise<boolean> {
    await this.clearTokensExpired();
    const tokenInBlacklist = await this.prisma.jWTBlacklist.findFirst({
      where: { token },
    });
    return !!tokenInBlacklist;
  }

  async clearTokensExpired() {
    await this.prisma.jWTBlacklist.deleteMany({
      where: {
        expiracion: {
          lte: new Date(),
        },
      },
    });
  }

  async generateToken(idUser: number) {
    return {
      access_token: await this.generateAccessToken(idUser),
      refresh_token: this.jwt.sign(
        { idUser },
        {
          expiresIn: refreshTokenExpiresIn,
          secret: process.env.JWT_REFRESH_SECRET,
        },
      ),
    };
  }

  async generateAccessToken(idUser: number) {
    return this.jwt.sign(
      { idUser },
      { expiresIn: accessTokenExpiresIn, secret: process.env.JWT_SECRET },
    );
  }

  async verifyToken(token: string) {
    return this.jwt.verify(token, {
      secret: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async verifyRefreshToken(token: string) {
    return this.jwt.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
    });
  }

  async decode(token: string) {
    return this.jwt.decode(token);
  }

  async refreshToken(token: string) {
    const { idUser } = await this.verifyRefreshToken(token);
    return {
      access_token: this.jwt.sign(
        { idUser },
        { expiresIn: refreshTokenExpiresIn, secret: process.env.JWT_SECRET },
      ),
    };
  }
}
