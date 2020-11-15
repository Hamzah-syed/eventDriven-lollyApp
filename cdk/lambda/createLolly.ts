import * as AWS from "aws-sdk";
import { LollyType } from "./lollyType";
const axios = require("axios");

const Client = new AWS.DynamoDB.DocumentClient();

const createLolly = async (newLolly: LollyType) => {
  const params: any = {
    TableName: process.env.DYNAMO_TABLE_NAME,
    Item: newLolly,
  };

  try {
    await Client.put(params).promise();
    axios
      .post(
        "https://codebuild.us-east-2.amazonaws.com/webhooks?t=eyJlbmNyeXB0ZWREYXRhIjoiS2Jwem56eEFPTWtja0FLN2xwL2tiUndmS2R0bWVBdk4zdSthUWo4OS9tb1dYNWNVU1lUY25PcytFMXNKNnUwelE4YnZJckFNRmtsS2FVUzA2cXc3V2dzPSIsIml2UGFyYW1ldGVyU3BlYyI6IlpMS1RjWjBVOHRiZmdWUkQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&v=1"
      )
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.error(error);
      });
    return newLolly;
  } catch (error) {
    return error.toString();
  }
};

export default createLolly;
