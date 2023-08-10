import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { CryptService } from './crypt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [HelperService, CryptService, JwtService],
    exports: [HelperService, CryptService]
})

export class UtilModule {}
