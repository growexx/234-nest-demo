import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';

@Schema({
    collection: 'user'
})
export class User {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: string

    @Prop({ unique: true })
    email: string;

    @Prop()
    // @Exclude()
    password: string;

    @Prop({ min: 2, max: 30 })
    firstName: string;

    @Prop({ min: 2, max: 30 })
    lastName: string;

    @Prop()
    countryCode: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    isActive: number;

    @Prop({ default: 0 })
    // @Exclude()
    otp: number;

    @Prop({ default: 0 })
    // @Exclude()
    phoneOtp: number;

    @Prop()
    profilePicture: string;

    @Prop()
    resetToken: string;

    @Prop()
    resetExpiryTime: Date;

    @Prop({ enum: [0, 1], default: 0 })
    // @Exclude()
    isDelete: number;

    @Prop({ enum: [1, 2, 3, 4], default: 1 })
    role: number;

    @Prop()
    requestedCountryCode: string;

    @Prop()
    requestedPhoneNumber: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export type UserDocument = mongoose.HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
