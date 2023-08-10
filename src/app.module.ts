import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './shared/middleware/currentUser.middleware';
import { JwtService } from '@nestjs/jwt';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilModule } from './util/util.module';
import { APP_PIPE } from '@nestjs/core';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const mongoHost = `${config.get('DB_HOST')}/${config.get('DB_NAME')}`;

        const mongoCredetials = config.get('DB_USERNAME')
          ? `${config.get('DB_USERNAME')}:${encodeURIComponent(
              config.get('DB_PASSWORD'),
            )}@`
          : '';
        const uri = `mongodb+srv://${mongoCredetials}${mongoHost}`;

        console.log('mongoHost', mongoHost);

        return { uri };
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/locales'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    UsersModule,
    UtilModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/auth/signup', method: RequestMethod.POST },
        { path: '/auth/signin', method: RequestMethod.POST },
        { path: '/auth/refresh', method: RequestMethod.GET },
        { path: '/blog/list', method: RequestMethod.GET },
        { path: '/blog/:id', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
