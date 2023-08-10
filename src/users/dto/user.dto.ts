import { Expose, Transform } from "class-transformer"

export class UserDto {
    @Expose()
    @Transform((params) => params.obj._id.toString())
    _id: string

    @Expose()
    email: string

    @Expose()
    firstName: string

    @Expose()
    lastName: string

    @Expose()
    phoneNumber: string

    @Expose()
    countryCode: string

    @Expose()
    role: number

    @Expose()
    profilePicture: string

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date

    @Expose()
    token: string
}
