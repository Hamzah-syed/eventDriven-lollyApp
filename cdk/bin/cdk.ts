#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkStack } from "../lib/cdk-stack";
import { lollyEventDrivenStack } from "../lib/lollyEventDriven";

const app = new cdk.App();
new lollyEventDrivenStack(app, "lollyEventDrivenStack", {
  env: {
    region: "us-east-2",
  },
});
