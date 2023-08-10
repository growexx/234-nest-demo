import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryParamDto {
    @IsOptional()
    @Transform(({ obj }) => Number(obj.limit))
    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'Limit No. of records',
        example: 5,
        default: 10
    })
    limit: number

    @IsOptional()
    @Transform(({ obj }) => Number(obj.skip))
    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'Skip the No. of records',
        example: 0,
        default: 0
    })
    skip: number

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'search the records',
        example: 'abc',
        default: ''
    })
    search: string

    @IsOptional()
    @IsString()
    @Transform(({ obj }) => obj.sort || null)
    @ApiProperty({
        type: String,
        description: 'sort the records by field',
        example: 'publishedAt',
        default: 'updatedAt'
    })
    sort: string

    @IsOptional()
    @Transform(({ obj }) => obj.order ? Number(obj.order) : null)
    @IsIn([1, -1])
    @ApiProperty({
        type: String,
        description: 'order of the records sort by either ascending=1 or descending=-1 order',
        example: -1,
        default: 1
    })
    order: number

    @IsOptional()
    @Transform(({ obj }) => obj.status === 'true')
    @IsIn([true, false])
    @ApiProperty({
        type: Boolean,
        description: 'status of the records filter by either Active=true or Inactive=false blog status',
        example: true,
        default: undefined
    })
    status: boolean
}
