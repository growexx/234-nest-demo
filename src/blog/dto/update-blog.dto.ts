import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'To Delete Blog',
    example: false,
    default: false,
  })
  isDelete: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'To Publish Blog',
    example: false,
  })
  isPublished: boolean;
}
