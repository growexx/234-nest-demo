import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { I18nContext, I18nService, I18nTranslation } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly i18n: I18nService

  static errorResponse () {
    return JSON.parse(
        JSON.stringify({
            status: 0,
            data: {},
            message: ''
        })
    );
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = I18nContext.current<I18nTranslation>(host);
    // console.log('current language', i18n, this.i18n);


    const http = host.switchToHttp();
    const response = http.getResponse();

    let status = exception.getStatus();
    const error: any = exception.getResponse();
    // console.log('exception......', error, status);

    const responseObject = HttpExceptionFilter.errorResponse();
    if (error && typeof error === 'object') {
      responseObject.message = error.message || 'Something went wrong. please try again.'; // error.message || res.__('ERROR_MSG');
      if (error.description && error.message) error.message.replace('{s}', error.description) 
      status = error.statusCode ||  status || HttpStatus.BAD_REQUEST;
    } else {
      const errorMsg = (error && exception?.cause) ? error.replace('{s}', exception?.cause) : error
      responseObject.message = errorMsg;
      status = status || HttpStatus.BAD_REQUEST;
    }
    responseObject.data = error.data;

    return response.status(status).send(responseObject);
  }
}
