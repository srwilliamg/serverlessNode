import AWS from 'aws-sdk';
import {v4 as uuid} from 'uuid';

async function createAuction(event, context) {
  
  const dynamodb =  new AWS.DynamoDB.DocumentClient();
  const {title} = JSON.parse(event.body);
  const date = new Date();

  const auction ={
    id: uuid(),
    title,
    status:'OPEN',
    createdAt: date.toISOString(),
  };

  const response = await dynamodb.put({
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}

export const handler = createAuction;


