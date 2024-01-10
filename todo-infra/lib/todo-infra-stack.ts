import * as cdk from "aws-cdk-lib";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class TodoInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DDB table to store the tasks.
    const table = new ddb.Table(this, "Tasks", {
      partitionKey: { name: "task_id", type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: "ttl",
    });

    // Add a GSI based on user_id.
    table.addGlobalSecondaryIndex({
      indexName: "statusIndex",
      partitionKey: { name: "user_id", type: ddb.AttributeType.STRING },
      sortKey: { name: "created_time", type: ddb.AttributeType.NUMBER },
    });

    // Create Lambda function for the API.
    const api = new lambda.Function(this, "API", {
        runtime: lambda.Runtime.PYTHON_3_12,
        code: lambda.Code.fromAsset("../api"),
        handler: "todo.handler",
        environment: {
            TABLE_NAME:table.tableName,
        },
    });

    // Create URL so we can access the functipon.
    const functionUrl = api.addFunctionUrl({
        // TODO: Change AUTH settings here?
        authType: lambda.FunctionUrlAuthType.NONE,
        cors: {
            allowedOrigins: ["*"],
            allowedMethods: [lambda.HttpMethod.ALL],
            allowedHeaders: ["*"],
        },
    });

    // Output the API function url.
    new cdk.CfnOutput(this, "APIUrl", {
        value: functionUrl.url,
    });

    // Give Lambda permissions to read/write to the table.
    table.grantReadWriteData(api);
    
  }
}
