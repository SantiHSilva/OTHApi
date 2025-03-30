import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { getDomain, getSystemInfo } from 'src/utils/utils';
import { PropsAccount } from '../auth/auth.model';

@Injectable()
export class MailsService {
  constructor(private mailerService: MailerService) {}

  async sendVerifyAccount(info: PropsAccount) {
    const { name, email, token, headers } = info;
    const { browser_name, operating_system } = getSystemInfo(headers);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verificación de cuenta',
      template: 'verify_account',
      context: {
        name: name,
        url: getDomain(info.redirectUrl),
        action_url: `${info.redirectUrl}/${token.token}`,
        operating_system: operating_system,
        browser_name: browser_name,
        producto: process.env.APP_NAME || 'Observatorio',
        support_url: getDomain(info.redirectUrl),
        totalHours: token.expiresIn,
      },
    });
  }

  async sendResetPassword(info: PropsAccount) {
    const { name, email, token, headers } = info;
    const { browser_name, operating_system } = getSystemInfo(headers);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Restablecer contraseña',
      template: 'reset_password',
      context: {
        name: name,
        url: getDomain(info.redirectUrl),
        action_url: `${info.redirectUrl}/${token.token}`,
        operating_system: operating_system,
        browser_name: browser_name,
        producto: process.env?.APP_NAME || 'No Configurado',
        support_url: getDomain(info.redirectUrl),
        totalHours: token.expiresIn,
      },
    });
  }
}
