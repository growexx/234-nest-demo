import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

const logger: Logger = new Logger();

export const seedData = async (uri, name, data) => {
  const connection = await mongoose.connect(uri);
  try {
    const response = await connection.connection.db.collection(name);
    const insert = await response.insertMany(data, { ordered: false, forceServerObjectId: true });
    logger.log(`Seed Data into Collection ${uri}: ${insert}`);
  } catch (e) {
    logger.log('Seed Data Error', e);
  }
};

export const dropCollection = async (uri, name) => {
  const connection = await mongoose.connect(uri);
  try {
    const response = await connection.connection.db.dropCollection(name);
    logger.log(`Dropped Collection ${uri}: ${response}`);
  } catch (e) {
    logger.log('Drop Collection Error', e);
  }
};

export const dropDB = async uri => {
  const connection = await mongoose.connect(uri);
  try {
    const response = await connection.connection.db.dropDatabase();
    logger.log(`Dropped ${uri}: ${response}`);
  } catch (e) {
    logger.log('Db Drop Error', e);
  }
};

export const getMongoUri = () => {
  try {
    const mongoHost = `${process.env.DB_HOST}/${process.env.DB_NAME}`;

    const mongoCredetials = process.env.DB_USERNAME ? 
      `${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@` 
      : '';
    const uri = `mongodb+srv://${mongoCredetials}${mongoHost}`;
    return uri;
  } catch (e) {
    logger.log('Seed Data Error', e);
  }
};

