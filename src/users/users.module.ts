import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UtilModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(CurrentUserMiddleware)
  //     .forRoutes('*');
  // }
}
