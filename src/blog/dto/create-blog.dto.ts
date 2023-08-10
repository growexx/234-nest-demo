import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    @ApiProperty({
        type: String,
        description: 'Blog Title',
        example: 'This is my first blog'
    })
    title: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({
        type: String,
        description: 'Blog Description',
        example: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    })
    description: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    @ApiProperty({
        type: String,
        description: 'Actual Blog Content',
        example: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    })
    content: string
}

