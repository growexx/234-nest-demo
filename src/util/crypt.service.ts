import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptService {
  private ENCRYPTION_KEY: string;
  private IV_LENGTH = 16;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.ENCRYPTION_KEY = configService.get<string>('JWT_SECRET');
  }

  enCryptPassword(password: string): Promise<string> {
    return new Promise((resolve) => {
      // console.log(typeof this.ENCRYPTION_KEY, Buffer.from(this.ENCRYPTION_KEY, 'base64'))
      // const iv = crypto.randomBytes(this.IV_LENGTH);
      // const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
      // let encrypted: Buffer = cipher.update(password);
      // encrypted = Buffer.concat([encrypted, cipher.final()]);
      // return resolve(`${iv.toString('hex')}:${encrypted.toString('hex')}`);

      const salt = crypto.randomBytes(this.IV_LENGTH).toString('hex');
      const hash = crypto.scryptSync(password, salt, 10) as Buffer;

      password = salt + '.' + hash.toString('hex');
      return resolve(password);
    });
  }

  async comparePassword(compare: string, original: string): Promise<boolean> {
    // const textParts: string[] = original.split(':');
    // const iv: Buffer = Buffer.from(textParts.shift(), 'hex');
    // const encryptedText: Buffer = Buffer.from(textParts.join(':'), 'hex');
    // const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    // let decrypted: Buffer = decipher.update(encryptedText);
    // decrypted = Buffer.concat([decrypted, decipher.final()]);
    // return compare === decrypted.toString();

    const [salt, storedHash] = original.split('.');
    const hash = crypto.scryptSync(compare, salt, 10) as Buffer;

    return hash.toString('hex') === storedHash;
  }

  async getUserToken(user: {
    _id: string;
    email: string;
    role: number;
  }): Promise<{ token: string }> {
    const tokenOptionalInfo: JwtSignOptions = {
      secret: this.configService.get<string>('JWT_SECRET'),
      algorithm: 'HS256',
      expiresIn: '2days',
    };

    const token: string = this.jwtService.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      tokenOptionalInfo,
    );

    return { token };
  }
}
