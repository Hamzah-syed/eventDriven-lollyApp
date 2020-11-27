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
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import * as iam from "@aws-cdk/aws-iam";
import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codeBuild from "@aws-cdk/aws-codebuild";
import * as pipelines from "@aws-cdk/pipelines";
import * as commits from "@aws-cdk/aws-codecommit";

export interface PipelineStackProps extends cdk.StackProps {
  domainName?: string;
}

export class lollyEventDrivenStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: PipelineStackProps) {
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
    const distribution = new cloudfront.Distribution(
      this,
      "lollydistribution",
      {
        defaultBehavior: { origin: new origins.S3Origin(bucket) },
      }
    );
    const repoName = "eventDriven-lollyApp";

    const repo = commits.Repository.fromRepositoryName(
      this,
      "ImportedRepo",
      repoName
    );

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();
    const pipeline = new pipelines.CdkPipeline(this, "Pipeline", {
      pipelineName: "MyAppPipeline",
      cloudAssemblyArtifact: cloudAssemblyArtifact as any,

      // Here we use CodeCommit instead of Github
      sourceAction: new codepipeline_actions.CodeCommitSourceAction({
        actionName: "CodeCommit_Source",
        repository: repo as any,
        
        output: sourceArtifact,
      }) as any,

      synthAction: pipelines.SimpleSynthAction.standardNpmSynth({
        sourceArtifact: sourceArtifact as any,
        cloudAssemblyArtifact: cloudAssemblyArtifact as any,
        // Use this if you need a build step (if you're not using ts-node
        // or if you have TypeScript Lambdas that need to be compiled).
        buildCommand: "npm run build && npm run test",
      }),
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
