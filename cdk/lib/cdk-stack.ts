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
import { Code } from "@aws-cdk/aws-lambda";

export class CdkStack extends cdk.Stack {
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

    //cloudFront
    // new cloudfront.CloudFrontWebDistribution(this, "cloudFrontDis", {
    //   originConfigs: [
    //     {
    //       behaviors: [
    //         {
    //           isDefaultBehavior: true,
    //           // respond to HEAD and GET methods
    //           allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD,
    //         },
    //       ],
    //       s3OriginSource: {
    //         // set our bucket as source
    //         s3BucketSource: s3Bucket,
    //         // allow Cloudfront to get objects from the bucket
    //         originAccessIdentity: new cloudfront.OriginAccessIdentity(
    //           this,
    //           "app-access-identity"
    //         ),
    //       },
    //     },
    //   ],
    // });

    // const deployBuild = new codebuild.Project(this, "app-build", {
    //   // specify where to look for build instructions
    //   buildSpec: codebuild.BuildSpec.fromSourceFilename("ci/buildspec.yml"),

    //   // define source code location

    //   source: codebuild.Source.gitHub({
    //     owner: "hamzah-dev",
    //     repo: "aws-serverless-vlolly",

    //     webhookFilters: [
    //       // trigger Codebuild project on PUSH to master branch

    //       codebuild.FilterGroup.inEventOf(
    //         codebuild.EventAction.PUSH
    //       ).andHeadRefIs("^refs/heads/master$"),
    //     ],
    //   }),

    //   environment: {
    //     buildImage: codebuild.LinuxBuildImage.STANDARD_3_0,
    //   },

    //   // set our bucket as a target location for build artifacts
    //   artifacts: codebuild.Artifacts.s3({
    //     bucket: s3Bucket,
    //     // put artifacts directly in the root of the bucket
    //     packageZip: false,
    //     encryption: false,
    //     includeBuildId: false,
    //     name: ".",
    //   }),
    // });
    // new codebuild.GitHubSourceCredentials(this, "githubCren", {
    //   accessToken: SecretValue.plainText(
    //     "1b1d52e45288b67602aa85f57562ab00f5ee33fa"
    //   ),
    // });

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

    //creating lambda function
    const lambdaFunc = new lambda.Function(this, "lollyLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "lollyApi.handler",
      memorySize: 1024,
      environment: {
        DYNAMO_TABLE_NAME: lollyTable.tableName,
      },
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
  }
}
