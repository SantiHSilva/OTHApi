import { hash, compare } from 'bcrypt';

export function getSystemInfo(headers: any) {
  const { 'user-agent': userAgent } = headers;
  const [os, browser] = userAgent
    .split(') ')[0]
    .split('(')
    .map((el: string) => el.trim());
  return {
    operating_system: os,
    browser_name: browser,
  };
}

const saltOrRounds = 12;

export const hashPassword = async (password: string) => {
  return await hash(password, saltOrRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const generateRandomPassword = (length: number) => {
  const getRandomChar = () => {
    const charSets = [
      [48, 57], // Numbers (0-9)
      [65, 90], // Uppercase letters (A-Z)
      [97, 122], // Lowercase letters (a-z)
      [33, 47], // Special characters (!"#$%&'()*+,-./)
      [91, 96], // Special characters ([\]^_`)
    ];

    // Select a random character set
    const charSet = charSets[Math.floor(Math.random() * charSets.length)];
    // Generate a random character code from the selected set
    const charCode =
      Math.floor(Math.random() * (charSet[1] - charSet[0] + 1)) + charSet[0];
    // Convert the character code to a character
    return String.fromCharCode(charCode);
  };

  let password = '';
  for (let i = 0; i < length; i++) {
    password += getRandomChar();
  }

  return password;
};

export function MBtoBytes(mb: number): number {
  return mb * 1024 * 1024;
}

export function bytesToMB(bytes: number): number {
  return bytes / 1024 / 1024;
}

export function getDomain(url: string): string {
  // http://localhost:3000/reset-password
  // -> http://localhost:3000
  const domain = url.match(/(http|https):\/\/[^/]+/);
  return domain[0];
}
