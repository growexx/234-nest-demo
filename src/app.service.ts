import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): any {
    // throw new NotFoundException('Health check not found....')
    return {
      status: 'ok',
      date: new Date()
    }
  }
}
