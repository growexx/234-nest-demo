import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogDto } from './dto/blog.dto';
import { Serialize } from '../shared/interceptors/serialize.interceptor';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseData } from '../shared/dto/response.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/currentUser.decorator';
import { User } from '../users/entities/user.entity';
import { QueryParamDto } from './dto/query-param.dto';

@Controller('blog')
@Serialize(BlogDto)
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Success', type: ResponseData })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. please try again.',
    type: ResponseData,
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @CurrentUser() user: User,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const data = await this.blogService.create(createBlogDto, user._id, i18n);
      return data;
    } catch (error) {
      throw new HttpException(
        i18n.t('test.ERROR_MSG'),
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: new Error(error) },
      );
    }
  }

  @ApiResponse({ status: 200, description: 'Success', type: ResponseData })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. please try again.',
    type: ResponseData,
  })
  @Get('list')
  async findAll(@Query() query: QueryParamDto, @I18n() i18n: I18nContext) {
    try {
      const data = await this.blogService.findAll(query, i18n);
      return data;
    } catch (error) {
      throw new HttpException(
        i18n.t('test.ERROR_MSG'),
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: new Error(error) },
      );
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success', type: ResponseData })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. please try again.',
    type: ResponseData,
  })
  @UseGuards(AuthGuard)
  @Get()
  async findMyBlogs(
    @Query() query: QueryParamDto,
    @CurrentUser() user: User,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const data = await this.blogService.findMyBlogs(user, query, i18n);
      return data;
    } catch (error) {
      throw new HttpException(
        i18n.t('local.ERROR_MSG'),
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: new Error(error) },
      );
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success', type: ResponseData })
  @ApiResponse({
    status: 404,
    description: 'Requested Blog not found.',
    type: ResponseData,
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. please try again.',
    type: ResponseData,
  })
  // @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    try {
      const data = await this.blogService.findOne(id, i18n);
      return data;
    } catch (error) {
      // throw error;
      const errorMsg = error?.message || i18n.t('test.ERROR_MSG');
      const errorStatus = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMsg, errorStatus, {
        cause: error?.options?.description,
        description: error?.options?.description,
      });
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Blog successfully updated in draft mode',
    type: ResponseData,
  })
  @ApiResponse({
    status: 404,
    description: 'Requested Blog not found.',
    type: ResponseData,
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. please try again.',
    type: ResponseData,
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() updateBlogDto: UpdateBlogDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const data = await this.blogService.update(id, user, updateBlogDto, i18n);
      return data;
    } catch (error) {
      const errorMsg = error?.message || i18n.t('test.ERROR_MSG');
      const errorStatus = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMsg, errorStatus, {
        cause: error?.options?.description,
        description: error?.options?.description,
      });
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Blog successfully approved and published.',
    type: ResponseData,
  })
  @ApiResponse({
    status: 404,
    description: 'Requested Blog not found.',
    type: ResponseData,
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong. please try again.',
    type: ResponseData,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async approveBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @I18n() i18n: I18nContext,
  ) {
    try {
      const data = await this.blogService.approveBlog(id, updateBlogDto, i18n);
      return data;
    } catch (error) {
      const errorMsg = error?.message || i18n.t('test.ERROR_MSG');
      const errorStatus = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMsg, errorStatus, {
        cause: error?.options?.description,
        description: error?.options?.description,
      });
    }
  }
}
