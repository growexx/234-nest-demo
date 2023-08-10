import { HttpStatus } from "@nestjs/common";
import mongoose from "mongoose";

export const blogSeed = [{
    _id: new mongoose.Types.ObjectId('64677675721c009374e9fe18'),
    userId: new mongoose.Types.ObjectId('5f083c352a7908662c334532'),
    title: 'This is my second blog.',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',
    isDelete: false
}, {
    _id: new mongoose.Types.ObjectId('6468a0f59d30001afef21d4c'),
    userId: new mongoose.Types.ObjectId('6467086e371455e3dd39c822'),
    title: 'This is my first blog.',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',
    isDelete: false
}, {
    _id: new mongoose.Types.ObjectId('64677675721c009374e9fe17'),
    userId: new mongoose.Types.ObjectId('6467086e371455e3dd39c822'),
    title: 'This is my second blog.',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',
    isDelete: false
}];

export const addBlog = [{
    it: 'As a user, I should validate add Blog request',
    options: {
    },
    status: HttpStatus.BAD_REQUEST
},
{
    it: 'As a user, I should validate add Blog request has title',
    options: {
        description: 'This is my last blog.',
        content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.'
    },
    status: HttpStatus.BAD_REQUEST
},
{
    it: 'As a user, I should validate add Blog request has description',
    options: {
        title: 'This is my last blog',
        content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.'
    },
    status: HttpStatus.BAD_REQUEST
}, {
    it: 'As a user, I should validate add Blog request has content',
    options: {
        title: 'This is my last blog',
        description: 'This is my last blog.'
    },
    status: HttpStatus.BAD_REQUEST
},
{
    it: 'As a user, I should validate add Blog request has valid title',
    options: {
        title: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',
        description: 'User Blog given.',
        content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.'
    },
    status: HttpStatus.BAD_REQUEST
},
{
    it: 'As a user, I should validate add Blog request has valid description',
    options: {
        title: 'Blog title',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',
        content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.'
    },
    status: HttpStatus.BAD_REQUEST
}, {
    it: 'As a user, I should validate add Blog request has valid content',
    options: {
        title: 'Blog title',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\".',
        content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem. happy'
    },
    status: HttpStatus.BAD_REQUEST
}];

export const getBlog = [{
    it: 'As a user, I should validate feedback request',
    options: {
    },
    status: 0
},
{
    it: 'As a user, I should validate feedback request has valid id',
    options: {
        id: '5f083c352a7908662c334532'
    },
    status: 0
},
{
    it: 'As a user, I should validate feedback request has id',
    options: {
        id: '6acdf290-c701-11ed-8fef-4b53ac590679'
    },
    status: 0
}];

export const listBlog = [{
    it: 'I should able to list feedback without any params',
    options: {},
    status: 1
},
{
    it: 'I should able to list feedback without pagination',
    options: { isPaginate: false },
    status: 1
},
{
    it: 'I should not able to list feedback with invalid page param',
    options: { page: '1n' },
    status: 0
},
{
    it: 'I should able to list feedback with page param',
    options: { page: 1 },
    status: 1
},
{
    it: 'I should able to list feedback with page and limit params and sort by designation',
    options: { page: 1, limit: 10, sort: 1, sortBy: 'createdAt' },
    status: 1
},
{
    it: 'I should able to list feedback with page, limit and category params',
    options: { page: 2, limit: 10 },
    status: 1
}];

export const deleteBlog = [{
    it: 'As a user, I should validate feedback request',
    options: {
    },
    status: 0
},
{
    it: 'As a user, I should validate feedback request has valid id',
    options: {
        id: '5f083c352a7908662c334532'
    },
    status: 0
},
{
    it: 'As a user, I should validate feedback request has id',
    options: {
        id: '6acdf290-c701-11ed-8fef-4b53ac590679'
    },
    status: 0
}];

export const patchBlog = [{
    it: 'As a user, I should validate feedback request',
    options: {
    },
    status: 0
},
{
    it: 'As a user, I should validate feedback request has valid id',
    options: {
        id: '5f083c352a7908662c334532'
    },
    status: 0
},
{
    it: 'As a user, I should validate feedback request has id',
    options: {
        id: '6acdf291-c701-11ed-8fef-4b53ac590679'
    },
    status: 0
}];

export const updateBlog = [{
    it: 'As a user, I should validate update feedback request',
    options: {
    },
    status: 0
},
{
    it: 'As a user, I should validate update feedback request has valid id',
    options: {
        id: '5f083c352a7908662c334532'
    },
    status: 0
},
{
    it: 'As a user, I should validate update feedback request has id',
    options: {
        id: '6acdf291-c701-11ed-8fef-4b53ac590679'
    },
    status: 0
},
{
    it: 'As a user, I should validate update feedback request has description',
    options: {
        description: 'Updated feedback provided.'
    },
    status: 0
},
{
    it: 'As a user, I should validate update feedback request has title',
    options: {
        title: 'Updated Feedback title'
    },
    status: 0
},
{
    it: 'As a user, I should validate update feedback request has valid title',
    options: {
        title: 'Updated feature `request',
        description: 'updated feedback provided.'
    },
    status: 0
},
{
    it: 'As a user, I should validate update feedback request has valid description',
    options: {
        title: 'Updated Feedback title',
        description: 'Updated feedback`s provided'
    },
    status: 0
}, {
    it: 'As a user, I should validate update feedback request has properly updated resources or not.',
    options: {
        id: '6acdf291-c701-11ed-8fef-4b53ac590679',
        title: 'Updated Feedback title',
        description: 'Updated feedbacks provided'
    },
    status: 0
}];