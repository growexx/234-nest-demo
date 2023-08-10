import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class HelperService {
  static successResponse() {
    return JSON.parse(
      JSON.stringify({
        status: 1,
        data: {},
        message: '',
      }),
    );
  }

  generateOtp(): number {
    if (process.env.NODE_ENV === 'testing') {
      return 123456;
    } else {
      return Math.floor(Math.random() * 900000) + 100000;
    }
  }

  async sendResponse(
    data,
    i18n,
    successMessage,
    successMessageVars,
    extraData = {},
  ) {
    const responseObject = HelperService.successResponse();
    successMessage = 'local.' + successMessage;
    responseObject.message = successMessageVars
      ? await i18n.t(successMessage, { args: { s: successMessageVars } })
      : await i18n.t(successMessage);
    responseObject.data = data;
    return { ...responseObject, ...extraData };
  }
}
