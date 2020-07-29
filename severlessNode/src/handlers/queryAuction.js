import AWS from 'aws-sdk';
import middleware from '../lib/middleware'
import createError from 'http-errors';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

async function queryAuction(event, context) {
  let response = {}
  const {id} = event.pathParameters;

  try {
    response = await dynamodb.get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: {id},
    }).promise();

    response = response.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if(!response){
    throw new createError.NotFound(`Auction do not exist.`);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}

export const handler = middleware(queryAuction);


