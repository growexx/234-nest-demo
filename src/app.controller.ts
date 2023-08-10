import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

export class HealthDto {
  @ApiProperty({
    type: String,
    description: 'Status of App',
    example: 'ok'
  })
  status: string

  @ApiProperty({
    type: String,
    description: 'Server Current Timestamp',
    example: '2023-05-19T05:05:10.139Z'
  })
  date: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Health Check')
  @ApiResponse({ status: 200, description: 'Health check point', type: HealthDto })
  @Get()
  healthCheck(): any {
    return this.appService.healthCheck();
  }
}

