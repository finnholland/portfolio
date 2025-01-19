import { Stage, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApplicationProps } from "../types";
import { StaticHostingStack } from "./static-hosting-stack";

export class Application extends Stage {
  constructor(scope: Construct, id: string, props: ApplicationProps) {
    super(scope, id, props);

    const staticHosting = new StaticHostingStack(this, "StaticHostingStack", {
      ...props,
      certificateArn: props.cloudfrontCertificateArn,
      domainName: props.domainName,
      subDomainName: props.subDomainName,
      comment: props.comment,
      indexable: props.indexable,
    });
    Tags.of(staticHosting).add("stack", "static-hosting");
  }
}
