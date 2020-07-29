import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
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

export const handler = middy(queryAuctions)
.use(httpJsonBodyParser())
.use(httpEventNormalizer())
.use(httpErrorHandler());


