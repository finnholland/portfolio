import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";
import { StaticHosting } from "@aligent/cdk-static-hosting";
import {
  CacheHeaderBehavior,
  CachePolicy,
  EdgeLambda,
  LambdaEdgeEventType,
  OriginRequestHeaderBehavior,
  OriginRequestPolicy,
  ResponseHeadersPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { ResponseHeaderMappings } from "@aligent/cdk-static-hosting/lib/static-hosting";
import { StaticHostingProps } from "../types";
import { BlockPublicAccess } from "aws-cdk-lib/aws-s3";

export class StaticHostingStack extends Stack {
  constructor(scope: Construct, id: string, props: StaticHostingProps) {
    super(scope, id, props);

    // If a prerender stack has been provided then add our prerender lambdas
    let defaultBehaviorEdgeLambdas: EdgeLambda[] = [];

    const responseHeadersPolicies: ResponseHeaderMappings = {};
    if (!props.indexable) {
      // Ensure feature envs are NEVER indexed
      responseHeadersPolicies["defaultBehaviorResponseHeaderPolicy"] =
        new ResponseHeadersPolicy(this, "NoIndexNoFollow", {
          customHeadersBehavior: {
            customHeaders: [
              {
                header: "x-robots-tag",
                value: "noindex,nofollow",
                override: true,
              },
            ],
          },
        });
    }

    const remapBackendPaths = [
      {
        from: "/robots.txt",
        to: "/robots.txt",
      },
      {
        from: "/*sitemap*.xml",
        to: "/media/sitemap/sitemap.xml",
      },
    ];


    // only add remaps on real environments, don't want a real robots.txt causing an env to be indexed
    remapBackendPaths.push({
      from: "/robots.txt",
      to: "/robots.txt",
    });

    // Include prerender headers in the cache key and allow cache vary on sku
    const defaultBehaviorCachePolicy = new CachePolicy(
      this,
      "DefaultCachePolicy",
      {
        headerBehavior: CacheHeaderBehavior.allowList(
          "x-prerender",
          "x-request-prerender"
        ),
      }
    );

    const defaultBehaviorRequestPolicy = new OriginRequestPolicy(
      this,
      "DefaultBehaviourPolicy",
      {
        headerBehavior: OriginRequestHeaderBehavior.allowList(
          "x-forwarded-host",
          "x-request-prerender",
          "x-prerender-host",
          "x-prerender-user-agent"
        ),
      }
    );

    new StaticHosting(this, "StaticHostingStack", {
      responseHeadersPolicies,
      defaultBehaviorEdgeLambdas,
      defaultBehaviorCachePolicy,
      defaultBehaviorRequestPolicy,

      domainName: props.domainName,
      subDomainName: props.subDomainName,
      certificateArn: props.certificateArn,
      extraDistributionCnames: props.extraDomains,
      backendHost: props.backendPlatformDomain,
      comment: props.comment,
      s3ExtendedProps: { publicReadAccess: true, blockPublicAccess: undefined },
      // Disabled as CSP does not merge and report based on the values added via the meta tag in the app.
      // We still get the protection from the values in the meta tag, just not the reporting.
      disableCSP: true,

      // Static config for all stacks
      createPublisherGroup: true,
      createPublisherUser: true,
      enableCloudFrontAccessLogging: false,
      enableS3AccessLogging: false,
      enforceSSL: true,

      enableStaticFileRemap: !props.featureEnv, // don't use static file remaps on feature envs
      defaultRootObject: "index.html", // remove leading / from object as it messes with the feature envs
    });
  }
}
