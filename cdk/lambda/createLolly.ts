import * as AWS from "aws-sdk";
import { LollyType } from "./lollyType";

const Client = new AWS.DynamoDB.DocumentClient();
const eventClient = new AWS.EventBridge();
const createLolly = async (newLolly: LollyType) => {
  const params: any = {
    TableName: process.env.DYNAMO_TABLE_NAME,
    Item: newLolly,
  };
  const Eventparams = {
    Entries: [
      {
        Source: "lolly",
        EventBusName: "lollyBus",
        DetailType: "String",
        Detail: JSON.stringify({
          id: newLolly.id,
          to: newLolly.to,
          from: newLolly.from,
          message: newLolly.messsage,
          colorBottom: newLolly.colorBottom,
          colorTop: newLolly.colorTop,
          colorMiddle: newLolly.colorMiddle,
        }),

        Time: new Date(),
      },
    ],
  };

  try {
    await Client.put(params).promise();
    await eventClient.putEvents(Eventparams).promise();

    return newLolly;
  } catch (error) {
    return error.toString();
  }
};

export default createLolly;
