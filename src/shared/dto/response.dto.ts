import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

export class ResponseData  {
    @ApiProperty({
        type: String,
        description: 'Message either success or failure',
        example: 'Success or Failure'
    })
    @Expose()
    message: string

    @ApiProperty({
        type: Object && Array,
        description: 'Response Data if there is any',
        example: {}
    })
    @Expose()
    data: Object

    @ApiProperty({
        type: String,
        description: 'Status of request. If 0 then failure, else 1 for Success',
        example: 0,
        enum: [0, 1]
    })
    @Expose()
    status: number
}
