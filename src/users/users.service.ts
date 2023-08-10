import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { I18nContext } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { HelperService } from '../util/helper.service';
import { CryptService } from '../util/crypt.service';
import { ConstantService } from '../util/constants.service';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly helperService: HelperService,
    private readonly cryptService: CryptService,
  ) { }

  async create(createUserDto: CreateUserDto, i18n: I18nContext) {
    const { email, password, userType } = createUserDto
    const user: User = await this.userModel.findOne({ email }).lean();

    if (!user) {
      const hash = await this.cryptService.enCryptPassword(password);
      // const otp = this.helperService.generateOtp();

      const user = await this.userModel.create({
        ...createUserDto,
        password: hash,
        isActive: ConstantService.STATUS.ACTIVE,
        // otp: otp,
        role: userType
      });
      return await this.helperService.sendResponse(user, i18n, 'test.REGISTER_SUCCESS', null)
    } else if (!user.isActive) {
      throw new HttpException(i18n.t('test.INACTIVE_USER'), 400);
    } else {
      const data = await this.checkLogin(password, user, i18n);
      return await this.helperService.sendResponse(data, i18n, 'test.REGISTER_SUCCESS', null)
    }
  }

  async checkLogin (password, user, i18n) {
    const isMatch = await this.cryptService.comparePassword(password, user.password);
    const otherDetails = {};
    if (!isMatch) {
      throw new HttpException(i18n.t('test.ALREADY_REGISTER'), 422);
    } else {
      const token = await this.cryptService.getUserToken(user);
      delete user.password;
      delete user.__v;
      Object.assign(user, token, otherDetails);
    }
    return user;
  }

  async signIn(signInPayload: SignInDto, i18n: I18nContext) {
    let { email, password } = signInPayload

    // password = await this.cryptService.enCryptPassword(password)

    let user = await this.userModel.findOne({ email }).lean();

    // Wrong username
    if (!user) {
      throw new HttpException(
        i18n.t('local.LOGIN_FAILED'),
        401
      );
    } else if (user.isActive) {
      const isMatch: boolean = await this.cryptService.comparePassword(password, user.password);
  
      if (!isMatch) {
        throw new HttpException(i18n.t('local.LOGIN_FAILED'), 401);
      } else {
        const { _id, email, role } = user
        const token = await this.cryptService.getUserToken({ _id, email, role });
        delete user.password;
        user = Object.assign(user, token);
        return await this.helperService.sendResponse(user, i18n, 'LOGIN_SUCCESS', null)
      }
    } else {
      const data: any = { email: user.email, role: user.role }
      throw new HttpException(i18n.t('local.INACTIVE_USER'), 423, { cause: new Error(data) })
    }
  }

  getProfile(user: User, i18n) {
    return this.helperService.sendResponse(user, i18n, 'test.SUCCESS', null)
  }

  async findOne(id: string) {
    return this.userModel.findById(id).lean();
  }
}
