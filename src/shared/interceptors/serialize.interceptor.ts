import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    // console.log('I"m running before the handler ', context);

    return next.handle().pipe(
      map((data: any) => {
        // Run something after the request handler and before the response is sent
        // console.log('I"m Running before response is ent out ', data.data)

        const sanitizeData = plainToInstance(this.dto, data.data, {
          excludeExtraneousValues: true,
        })
        return { ...data, data: sanitizeData };
      })
    );
  }
}
