import AWS from 'aws-sdk';
import middleware from '../lib/middleware'
import createError from 'http-errors';
import validator from '@middy/validator';
import getAuctionSchema from '../lib/schemas/getAuctionsSchema';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let response = {}
  let {status} = event.queryStringParameters;
  
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: "statusAndEndDate",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeValues: {
      ":status": status,
    },
    ExpressionAttributeNames:{
      "#status": "status"
    },
  };

  try {
    response = await dynamodb.query(params).promise();
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

export const handler = middleware(getAuctions)
.use(validator({inputSchema: getAuctionSchema, useDefaults: true}));

