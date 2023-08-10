import { HttpException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { I18nContext } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model, Types } from 'mongoose';
import { HelperService } from '../util/helper.service';
import { User } from '../users/entities/user.entity';
import { QueryParamDto } from './dto/query-param.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
    private readonly helperService: HelperService,
  ) {}

  async create(createBlogDto: CreateBlogDto, userId, i18n: I18nContext) {
    const blog = await this.blogModel.create({
      ...createBlogDto,
      userId,
      isPublished: true,
    });
    return await this.helperService.sendResponse(blog, i18n, 'SUCCESS', null);
  }

  async findAll(query: QueryParamDto, i18n: I18nContext) {
    let { search, skip, limit, sort, order, status } = query;
    const sorting: any = { [sort]: order };

    const filterQuery: any = {
      isPublished: true,
      isDelete: false,
    };
    if (search)
      filterQuery.title = { $regex: new RegExp('^.*' + search + '.*', 'i') };
    if (status) {
      filterQuery.status = (['true', true].includes(status))
    }

    const count = await this.blogModel.countDocuments(filterQuery);
    const blog = await this.blogModel
      .find(filterQuery)
      .populate({ path: 'userDetail', select: '_id email firstName lastName' })
      .sort(sorting)
      .skip(skip)
      .limit(limit)
      .lean();
    return await this.helperService.sendResponse(blog, i18n, 'SUCCESS', null, {
      count,
    });
  }

  async findMyBlogs(user: User, query: QueryParamDto, i18n: I18nContext) {
    const { search, skip, limit, sort, order } = query;
    const sorting: any = { [sort]: order };

    console.log('{ userId: user._id, isPublished: true, isDelete: false }', {
      userId: user._id,
      isPublished: true,
      isDelete: false,
    });

    const filterQuery = {
      title: { $regex: new RegExp('^.*' + search + '.*', 'i') },
      userId: user._id,
      isPublished: true,
      isDelete: false,
    };
    const count = await this.blogModel.countDocuments(filterQuery);
    const blog = await this.blogModel
      .find(filterQuery)
      .sort(sorting)
      .skip(skip)
      .limit(limit)
      .lean();
    return await this.helperService.sendResponse(blog, i18n, 'SUCCESS', null, {
      count,
    });
  }

  async findOne(id: string, i18n: I18nContext) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(i18n.t('NOT_FOUND'), 404, {
        description: 'Blog',
        cause: i18n.t('test.NOT_FOUND'),
      });

    const blog = await this.blogModel
      .findOne({ _id: new Types.ObjectId(id), isDelete: false })
      .lean();
    if (!blog)
      throw new HttpException(i18n.t('NOT_FOUND'), 404, {
        description: 'Blog',
        cause: i18n.t('test.NOT_FOUND'),
      });

    return await this.helperService.sendResponse(blog, i18n, 'SUCCESS', null);
  }

  async update(
    id: string,
    user: User,
    updateBlogDto: UpdateBlogDto,
    i18n: I18nContext,
  ) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(i18n.t('test.NOT_FOUND'), 404, {
        description: 'Blog',
        cause: i18n.t('test.NOT_FOUND'),
      });

    const blog = await this.blogModel
      .countDocuments({
        _id: new Types.ObjectId(id),
        userId: user._id,
        isDelete: false,
      })
      .lean();
    if (!blog)
      throw new HttpException(i18n.t('test.NOT_FOUND'), 404, {
        description: 'Blog',
        cause: i18n.t('test.NOT_FOUND'),
      });

    await this.blogModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { ...updateBlogDto },
      { runValidators: true },
    );

    return await this.helperService.sendResponse(
      blog,
      i18n,
      'test.UPDATE_BLOG',
      null,
    );
  }

  async approveBlog(
    id: string,
    updateBlogDto: UpdateBlogDto,
    i18n: I18nContext,
  ) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(i18n.t('test.NOT_FOUND'), 404, {
        description: 'Blog',
        cause: i18n.t('test.NOT_FOUND'),
      });

    const blog = await this.blogModel
      .countDocuments({ _id: new Types.ObjectId(id), isDelete: false })
      .lean();
    if (!blog)
      throw new HttpException(i18n.t('test.NOT_FOUND'), 404, {
        description: 'Blog',
        cause: i18n.t('test.NOT_FOUND'),
      });

    const publishedAt = updateBlogDto.isPublished ? new Date() : undefined;
    await this.blogModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { ...updateBlogDto, publishedAt },
      { runValidators: true },
    );

    return await this.helperService.sendResponse(
      blog,
      i18n,
      'test.APPROVE_BLOG',
      null,
    );
  }
}
