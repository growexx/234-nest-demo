import { Expose, Transform } from "class-transformer"
import { UserDto } from "../../users/dto/user.dto"

export class BlogDto {
    @Expose()
    @Transform((params) => params.obj._id.toString())
    _id: string

    @Expose()
    userDetail: UserDto

    @Expose()
    title: string

    @Expose()
    description: string

    @Expose()
    content: string

    @Expose()
    status: boolean

    @Expose()
    publishedAt: Date

    @Expose()
    updatedAt: Date
}
