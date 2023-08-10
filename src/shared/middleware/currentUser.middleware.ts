import { ForbiddenException } from '@nestjs/common';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers?.authorization?.replace('Bearer ', '');
    console.log('token ', token);
    if (!token) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return this.checkUser(payload, res, next);
    } catch (error) {
      console.log('token error ', error);
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }
  }

  checkUser = (me: any, res: Response, next: NextFunction) => {
    return this.usersService
      .findOne(me.id)
      .then((userObj) => {
        if (!userObj) {
          throw new UnauthorizedException();
        } else if (!userObj.isActive) {
          throw new ForbiddenException('Your account is suspended');
        } else {
          res.locals.user = userObj;
        }
        return next();
      })
      .catch(next);
  };
}
