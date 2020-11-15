import * as AWS from "aws-sdk";

const Client = new AWS.DynamoDB.DocumentClient();
const allLollies = async () => {
  const params: any = {
    TableName: process.env.DYNAMO_TABLE_NAME,
  };

  try {
    const result = await Client.scan(params).promise();
    return result.Items;
  } catch (error) {
    return error.toString();
  }
};

export default allLollies;
