import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema({
    collection: 'blog'
})
export class Blog {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    userId

    @Prop({ maxlength: 40, required: true })
    title: string;

    @Prop({ maxlength: 100, required: true })
    description: string;

    @Prop({ maxlength: 1000, required: true })
    @Exclude()
    content: string;

    @Prop({ type: Boolean, default: false })
    isPublished: boolean;

    @Prop()
    publishedAt: Date;

    @Prop({ type: Boolean, default: false })
    status: boolean;

    @Prop({ type: Boolean, default: false })
    isDelete: boolean;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Object })
    user
}

export type BlogDocument = mongoose.HydratedDocument<Blog>;

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.virtual('userDetail', {
    ref: User.name,
    localField: 'userId',
    foreignField: '_id',
    justOne: true
})

BlogSchema.pre('save', function() {
    if (this.isNew) {
        this._id = new mongoose.Types.ObjectId();
    }
})
