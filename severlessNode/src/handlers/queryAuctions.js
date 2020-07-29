import AWS from 'aws-sdk';

const dynamodb =  new AWS.DynamoDB.DocumentClient();

async function queryAuctions(event, context) {
  const response = await dynamodb.query({
    TableName:'AuctionsTable',
    // Item: auction,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}

export const handler = queryAuctions;


