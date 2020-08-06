import AWS from 'aws-sdk';
import middleware from '../lib/middleware'
import createError from 'http-errors';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

export async function getAuctionById(id) {
  let response = {};

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: {id},
  };

  try {
    response = await dynamodb.get(params).promise();
    response = response.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if(!response){
    throw new createError.NotFound(`Auction do not exist.`);
  }

  return response;
}

async function queryAuction(event, context) {
  const {id} = event.pathParameters;

  const response = response = await getAuctionById(id);

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}

export const handler = middleware(queryAuction);


