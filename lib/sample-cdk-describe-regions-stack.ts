import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cr from "aws-cdk-lib/custom-resources";

export class SampleCdkDescribeRegionsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const regions = new cr.AwsCustomResource(this, "DescribeRegions", {
      onCreate: {
        service: "EC2",
        action: "describeRegions",
        physicalResourceId: cr.PhysicalResourceId.of(
          "DescribeRegionsPhysicalResourceId"
        ),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });

    new cdk.CfnOutput(this, "eu-north-1_OptInStatus", {
      value: regions.getResponseField("Regions.0.OptInStatus"),
    });
  }
}
