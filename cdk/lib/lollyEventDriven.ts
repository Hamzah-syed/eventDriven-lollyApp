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

    //s3 bucket deployment and specifinyg that where is the content
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

    // Artifact from source stage
    const sourceOutput = new codepipeline.Artifact();

    // Artifact from build stage
    const CDKOutput = new codepipeline.Artifact();

    //Code build action, Here you will define a complete build
    const cdkBuild = new codeBuild.PipelineProject(this, "CdkBuild", {
      buildSpec: codeBuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            "runtime-versions": {
              nodejs: 12,
            },
            commands: ["cd cdk", "npm i npm@latest -g", "npm install"],
          },
          build: {
            commands: ["npm run build", "npm run cdk synth -- -o dist"],
          },
        },
        artifacts: {
          "base-directory": "CI_CD_pipline_update_cdk_template/dist", ///outputting our generated JSON CloudFormation files to the dist directory
          files: [`${this.stackName}.template.json`],
        },
      }),
      environment: {
        buildImage: codeBuild.LinuxBuildImage.STANDARD_3_0, ///BuildImage version 3 because we are using nodejs environment 12
      },
    });

    ///Define a pipeline
    const pipline = new codepipeline.Pipeline(this, "LollyPipeline", {
      crossAccountKeys: false, //Pipeline construct creates an AWS Key Management Service (AWS KMS) which cost $1/month. this will save your $1.
      restartExecutionOnUpdate: true, //Indicates whether to rerun the AWS CodePipeline pipeline after you update it.
    });

    ///Adding stages to pipeline

    //First Stage Source
    pipline.addStage({
      stageName: "Source",
      actions: [
        new codepipeline_actions.GitHubSourceAction({
          actionName: "Checkout",
          owner: "hamzah-syed",
          repo: "eventDriven-lollyApp",
          oauthToken: cdk.SecretValue.secretsManager("github-token") as any, ///create token on github and save it on aws secret manager
          output: sourceOutput, ///Output will save in the sourceOutput Artifact
          branch: "master", ///Branch of your repo
        }),
      ],
    });

    pipline.addStage({
      stageName: "Build",
      actions: [
        new codepipeline_actions.CodeBuildAction({
          actionName: "cdkBuild",
          project: cdkBuild,
          input: sourceOutput,
          outputs: [CDKOutput],
        }),
      ],
    });

    pipline.addStage({
      stageName: "DeployCDK",
      actions: [
        new codepipeline_actions.CloudFormationCreateUpdateStackAction({
          actionName: "AdministerPipeline",
          templatePath: CDKOutput.atPath(`${this.stackName}.template.json`), ///Input artifact with the CloudFormation template to deploy
          stackName: this.stackName, ///Name of stack
          adminPermissions: true,
        }),
      ],
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
