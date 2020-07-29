import AWS from 'aws-sdk';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

async function queryAuctions(event, context) {
  const response = await dynamodb.scan({
    TableName: process.env.AUCTIONS_TABLE_NAME,
    // Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}

export const handler = queryAuctions;


