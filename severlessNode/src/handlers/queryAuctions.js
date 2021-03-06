import AWS from 'aws-sdk';
import middleware from '../lib/middleware'
import createError from 'http-errors';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

async function queryAuctions(event, context) {
  let response = {}

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    // Item: auction,
  };

  try {
    response = await dynamodb.scan(params).promise();
    response = response.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}

export const handler = middleware(queryAuctions);

