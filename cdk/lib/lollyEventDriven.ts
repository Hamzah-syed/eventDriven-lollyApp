import * as cdk from "@aws-cdk/core";
import * as appSync from "@aws-cdk/aws-appsync";
import * as dynamoDB from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import * as event from "@aws-cdk/aws-events";
import * as target from "@aws-cdk/aws-events-targets";
import * as lambdaDestination from "@aws-cdk/aws-lambda-destinations";
import * as pipline from "@aws-cdk/pipelines";

export class lollyEventDrivenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // s3 bucket
    const bucket = new s3.Bucket(this, "vlollyS3Bucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });
    //s3 bucket deployment and specifying that where is the content
    new s3Deployment.BucketDeployment(this, "vlolly-buketdeploy", {
      sources: [s3Deployment.Source.asset("../public")],
      destinationBucket: bucket,
    });
    //cloudfront (aws cdn)
    new cloudfront.Distribution(this, "lollydistribution", {
      defaultBehavior: { origin: new origins.S3Origin(bucket) },
    });

    // creating api
    const api = new appSync.GraphqlApi(this, "lollyApi", {
      name: "graphql-appSync-api",
      schema: appSync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appSync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
    });

    //creating table in dynamodb
    const lollyTable = new dynamoDB.Table(this, "lollyDynamodbTable", {
      billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        type: dynamoDB.AttributeType.STRING,
        name: "id",
      },
    });

    //creating bus
    const bus = new event.EventBus(this, "lollyEventDrivenBus", {
      eventBusName: "lollyBus",
    });

    //creating lambda function
    const lambdaFunc = new lambda.Function(this, "lollyLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "lollyApi.handler",
      memorySize: 1024,
      environment: {
        DYNAMO_TABLE_NAME: lollyTable.tableName,
      },
      onSuccess: new lambdaDestination.EventBridgeDestination(bus) as any,
    });

    // creating lambda function as a datasource
    const lambdaDatasource = api.addLambdaDataSource("lambdaDs", lambdaFunc);

    //attaching graphql resolvers
    lambdaDatasource.createResolver({
      typeName: "Query",
      fieldName: "allLollies",
    });
    lambdaDatasource.createResolver({
      typeName: "Query",
      fieldName: "getLolly",
    });
    lambdaDatasource.createResolver({
      typeName: "Mutation",
      fieldName: "createLolly",
    });

    lollyTable.grantFullAccess(lambdaFunc);

    //event target lambda function
    const eventTargetLambda = new lambda.Function(this, "eventTargetLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "helloWorld.handler",
    });
    new event.Rule(this, "lollyrule", {
      ruleName: "lollyRule",
      eventBus: bus,
      description: "lolly rule",
      eventPattern: {
        source: ["lolly"],
      },
    });
    new target.LambdaFunction(
      lambda.Function.fromFunctionArn(
        this,
        "ruleTarget",
        eventTargetLambda.functionArn
      ) as any
    );
  }
}
