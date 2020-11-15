import * as AWS from "aws-sdk";

const Client = new AWS.DynamoDB.DocumentClient();

const getLolly = async (lollyId: String) => {
  const params: any = {
    TableName: process.env.DYNAMO_TABLE_NAME,
    Key: {
      id: lollyId,
    },
  };
  try {
    const result = await Client.get(params).promise();
    return result.Item;
  } catch (error) {
    return error.toString();
  }
};

export default getLolly;
