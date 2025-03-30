import { randomUUID } from 'crypto';

export class TokenManager {
  data = [];
  minutesValid = 15;
  constructor() {}

  async generateToken() {
    const token = randomUUID();
    const date = new Date();
    date.setMinutes(date.getMinutes() + this.minutesValid);
    return {
      token: token,
      date: date,
    };
  }

  async existAccount(email: string) {
    await this.removeExpiredTokens();
    return this.data.find((el) => el.email === email);
  }

  async addAccount(email: string) {
    const { token, date } = await this.generateToken();

    this.data.push({
      email: email,
      token: token,
      date: date,
    });
    const tokenValidity = this.minutesValid;
    return { token, tokenValidity };
  }

  async removeAccount(email: string) {
    this.data = this.data.filter((el) => el.email !== email);
  }

  async removeExpiredTokens() {
    const now = new Date();
    this.data = this.data.filter((el) => now < el.date);
  }

  async verifyAccount(token: string): Promise<boolean | string> {
    this.removeExpiredTokens();
    const account = this.data.find((el) => el.token === token);
    if (!account) {
      return false;
    }
    const now = new Date();
    if (now > account.date) {
      return false;
    }

    // Remove token
    this.data = this.data.filter((el) => el.token !== token);

    return account.email;
  }
}
