import AWS from 'aws-sdk';
import middleware from '../lib/middleware'
import createError from 'http-errors';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

async function queryAuctions(event, context) {
  let response = {}

  try {
    response = await dynamodb.scan({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      // Item: auction,
    }).promise();

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

