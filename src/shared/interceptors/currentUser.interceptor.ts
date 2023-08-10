import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const res = context.switchToHttp().getResponse();
    const { _id: userId } = res.locals.user || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      res.currentUser = user
    }

    return next.handle();
  }
}
