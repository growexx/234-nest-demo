import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator"

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/, {
        message: 'email is not valid.'
    })
    @Transform(({ value }) => value.toLowerCase())
    @ApiProperty({
        type: String,
        description: 'Email Id',
        example: 'abc@xyz.com'
    })
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Encrypted Strong Password',
        example: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
    })
    password: string
}

export class CreateUserDto extends SignInDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'User First name',
        example: 'Narendra'
    })
    firstName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'User Last name',
        example: 'Modi'
    })
    lastName: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'User Phone Number',
        example: '8839202821'
    })
    phoneNumber: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'User country code',
        example: '91'
    })
    countryCode: string

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value || 1)
    @ApiProperty({
        type: Number,
        description: 'User Type',
        example: 1,
        enum: [1, 4],
        default: 1
    })
    userType: number
}
