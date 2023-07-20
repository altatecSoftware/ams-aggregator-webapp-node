import * as dotenv from 'dotenv';
dotenv.config();

export default {
  //Aggregator 
  SERVER_PORT: process.env.SERVER_PORT ?? '8080',

  //MongoDB
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,

  //AMAZON SQS
  AWS_REGION: process.env.AWS_REGION, 
  AWS_SQS_ACCESS_KEY_ID: process.env.AWS_SQS_ACCESS_KEY_ID, 
  AWS_SQS_SECRET_ACCESS_KEY: process.env.AWS_SQS_SECRET_ACCESS_KEY,

  AWS_SQS_CREATE_ASSET_QUEUE: process.env.AWS_SQS_CREATE_ASSET_QUEUE
};
