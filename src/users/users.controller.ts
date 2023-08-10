import { Controller, Get, Post, Body, UseGuards, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { User } from './entities/user.entity';
import { CurrentUser } from '../shared/decorators/currentUser.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseData } from '../shared/dto/response.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Auth')
  @ApiResponse({ status: 201, description: 'User registration successful', type: ResponseData })
  @ApiResponse({ status: 400, description: 'Please activate your user by verify email that has sent earlier', type: ResponseData })
  @ApiResponse({ status: 422, description: 'This user is already registered with us.', type: ResponseData })
  @ApiResponse({ status: 500, description: 'Something went wrong. please try again.', type: ResponseData })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @I18n() i18n: I18nContext) {
    try {
      const data = await this.usersService.create(createUserDto, i18n);
      return data;
    } catch (error) {
      const errorMsg = error?.message || i18n.t('test.ERROR_MSG')
      const errorStatus = error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException(errorMsg, errorStatus, { cause: error?.options?.description, description: error?.options?.description })
    }
  }

  @ApiTags('Auth')
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: ResponseData })
  @ApiResponse({ status: 401, description: 'Invalid user credentials.', type: ResponseData })
  @ApiResponse({ status: 423, description: 'Please activate your user by verify email that has sent earlier', type: ResponseData })
  @ApiResponse({ status: 500, description: 'Something went wrong. please try again.', type: ResponseData })
  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto, @I18n() i18n: I18nContext) {
    try {
      console.log('inside signin......')
      const data = await this.usersService.signIn(signInDto, i18n);
      return data;      
    } catch (error) {
      const errorMsg = error?.message || i18n.t('local.ERROR_MSG')
      const errorStatus = error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException(errorMsg, errorStatus, { cause: error?.options?.description, description: error?.options?.description })
    }
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success', type: ResponseData })
  @ApiResponse({ status: 500, description: 'Something went wrong. please try again.', type: ResponseData })
  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@I18n() i18n: I18nContext, @CurrentUser() user: User) {
    try {
      const data = this.usersService.getProfile(user, i18n);
      return data;
    } catch (error) {
      const errorMsg = error?.message || i18n.t('test.ERROR_MSG')
      const errorStatus = error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException(errorMsg, errorStatus, { cause: error?.options?.description, description: error?.options?.description })
    }
  }
}
