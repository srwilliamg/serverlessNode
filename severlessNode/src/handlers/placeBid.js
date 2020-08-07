import AWS from 'aws-sdk';
import {getAuctionById} from './queryAuction';
import middleware from '../lib/middleware'
import createError from 'http-errors';
import validator from '@middy/validator';
import placeBidSchema from '../lib/schemas/placeBidSchema';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  
  const {id} = event.pathParameters;
  const {amount} = event.body;

  const auction = await getAuctionById(id);

  if(auction.status !== "OPEN"){
    throw new createError.Forbidden(`You cannot bid in closed auctions!`);
  }

  if(amount <= auction.highestBid.amount){
    throw createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}!`);
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: {id},
    UpdateExpression: 'set highestBid.amount = :amount',
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",

  };

  let updatedAuction;

  try{
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  }
  catch(err){
    console.log(err);
    throw new createError.InternalServerError(err);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = middleware(placeBid)
.use(validator({inputSchema: placeBidSchema, useDefaults: true}));


