import { StackProps, StageProps } from "aws-cdk-lib";

export interface ApplicationProps extends StageProps {
  /**
   * Common props
   */
  featureEnvironments?: boolean;

  /**
   * Static Hosting props
   */
  domainName: string;
  subDomainName: string;
  backendPlatformDomain?: string;
  extraDomains?: string[];
  sitemapPath?: string;
  overrideLogicalId?: string;
  staticHostingStackNameOverride?: string;
  indexable?: boolean;
  enableWaf?: boolean;

  comment?: string;

  /**
   * Cloudfront Certificate ARN
   * Should cover {domainName}, *.{domainName} and *.feature.{domainName} if featureEnvironments is enabled
   */
  cloudfrontCertificateArn: string;
}

export interface PrerenderLambdaConfig {
  domain: string;
  token: string;
  frontendHost: string;
}

export interface StaticHostingProps extends StackProps {
  /**
   * SSL Certificate ARN
   */
  certificateArn: string;

  /**
   * Base domain name of this cloudfront distribution
   */
  domainName: string;

  /**
   * Subdomain the PWA should be hosted at
   */
  subDomainName: string;

  /**
   * Any extra domains this distribution will be referenced by
   */
  extraDomains?: string[];

  /**
   * Domain of the backend platform Magento, OroCommerce, Bigcommerce
   */
  backendPlatformDomain?: string;

  /**
   * Domain where the graphql server is hosted
   */
  graphqlDomain?: string;

  /**
   * Custom sitemap path on the backend. Defaults to `sitemap.xml`
   * Does nothing when sitemapGeneration is false
   */
  sitemapPath?: string;

  /**
   * URL suffixes. Used for multi-language support
   */
  urlSuffixes?: string;

  /**
   * If this stack is used for feature environments
   * If this is set to true, prerender cannot be used with this stack
   */
  featureEnv?: boolean;

  /**
   *
   */
  exportPrefix?: string;

  /**
   * Whether this site should be indexable by bots
   */
  indexable?: boolean;

  /**
   * After switching constructs, you need to maintain the same logical ID
   * for the underlying CfnDistribution if you wish to avoid the deletion
   * and recreation of your distribution.
   *
   * To do this, use escape hatches to override the logical ID created by
   * the new Distribution construct with the logical ID created by the
   * old construct
   *
   * @see https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront-readme.html#migrating-from-the-original-cloudfrontwebdistribution-to-the-newer-distribution-construct.
   * @default undefined
   */
  overrideLogicalId?: string;

  /**
   * Override the default static hosting stack name
   * Used during the migration from CDK 1 -> CDK 2 to maintain stack history
   */
  staticHostingStackNameOverride?: string;
  comment?: string;
  /**
   * Enable WAF in front of deployed resources (prod)
   */
  enableWaf?: boolean;

  /**
   * Prerender configuration options for edge functions
   */
  prerender?: PrerenderLambdaConfig;
}
