import * as AWS from "aws-sdk";
import { LollyType } from "./lollyType";

const Client = new AWS.DynamoDB.DocumentClient();

const createLolly = async (newLolly: LollyType) => {
  const params: any = {
    TableName: process.env.DYNAMO_TABLE_NAME,
    Item: newLolly,
  };

  try {
    await Client.put(params).promise();
    return newLolly;
  } catch (error) {
    return error.toString();
  }
};

export default createLolly;
