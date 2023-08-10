import { HttpStatus } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';

const MongoID = (id: string) : Types.ObjectId => {
  return new mongoose.Types.ObjectId(id);
};

export const users = [
    {
        _id: MongoID('5f083c352a7908662c334532'),
        email: 'user@mailinator.com',
        password: '',
        role: 1,
        isActive: 1,
        opt: 123456,
        firstName: 'user',
        lastName: 'last'
    },
    {
        _id: MongoID('5f083c352a7908662c334535'),
        email: 'inactive@mailinator.com',
        password: '',
        role: 1,
        isActive: 0,
        opt: 123456
    },
    {
        _id: MongoID('5f5f2cd2f1472c3303b6b861'),
        email: 'super@mailinator.com',
        password: '',
        role: 4,
        isActive: 1,
        firstName: 'Test',
        lastName: 'Admin'
    }
];

export const USER1 = {
  email: "test.nest@growexx.com",
  password: "8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e",
  firstName: "NestJS",
  lastName: "Growexx"
}

export const SignupTestCases = [{
  it: 'As a user I should validate if email is not pass',
  options: {
      email: '',
      password: 'Reset@123'
  },
  statusCode: HttpStatus.BAD_REQUEST,
  status: 0
},
{
  it: 'As a user I should validate if email key existing',
  options: {
      password: 'Test@12'
  },
  status: 0
},
{
  it: 'As a user I should check valid email',
  options: {
      email: 'john1',
      password: ''
  },
  status: 0
},
{
  it: 'As a user I should validate if password key existing',
  options: {
      email: 'john1@mailinator.com',
      password: ''
  },
  status: 0
},
{
  it: 'As a user I should validate if password is not pass',
  options: {
      email: 'john1@mailinator.com',
      password: ''
  },
  status: 0
},
{
  it: 'As a user I should validate if password is sha256 string with 64 characters',
  options: {
      email: 'john1@mailinator.com',
      password: '12345678910123456789101'
  },
  status: 0
}
]

export const SignInTestCases = [{
  it: 'As a user I should validate if email is not pass',
  options: {
      'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
  },
  statusCode: HttpStatus.BAD_REQUEST,
  status: 0
},
{
  it: 'As a user I should validate if email is invalid',
  options: {
      'email': 'invalid',
      'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
  },
  statusCode: HttpStatus.BAD_REQUEST,
  status: 0
},
{
  it: 'As a user I should validate if password is not pass',
  options: {
      'email': 'john1@mailinator.com',
      'password': ''
  },
  statusCode: HttpStatus.BAD_REQUEST,
  status: 0
},
{
  it: 'As a user, I should check invalid password',
  options: {
      'email': 'admin@mailinator.com',
      'password': 'Reset1@123'
  },
  status: 0
}]