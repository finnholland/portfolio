import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { Application } from "../lib/application";

const app = new App();

const prod = new Application(app, "portfolio", {
  env: {
    region: "ap-southeast-2",
    account: "653559667045",
  },
  cloudfrontCertificateArn:
    "arn:aws:acm:us-east-1:653559667045:certificate/3fbb82f9-6b51-4190-a88e-b51f8c48b46c",
  domainName: "finnholland.dev",
  subDomainName: "www",
  extraDomains: ["www.finnholland.dev", "finnholland.dev"],
  comment: "Portfolio",
});
// d2fjhvoe8vb7h9.cloudfront.net