import { CloudFrontRequestEvent } from "aws-lambda";

export const handler = async (event: CloudFrontRequestEvent) => {
  const request = event.Records[0].cf.request;

  request.headers["x-forwarded-host"] = [
    {
      key: "x-forwarded-host",
      value: request.headers.host[0].value,
    },
  ];

  return request;
};
