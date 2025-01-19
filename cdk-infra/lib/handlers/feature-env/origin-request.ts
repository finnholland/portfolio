import { CloudFrontRequestEvent } from "aws-lambda";

const IS_FILE =
  /\.(js|json|css|xml|less|csv|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)$/i;

export const handler = async (event: CloudFrontRequestEvent) => {
  let { request } = event.Records[0].cf;

  const host = request.headers["x-forwarded-host"][0].value;

  const matches = host.match(/^([^.]+)/);

  if (matches) {
    const branch = matches.pop();
    if (request.origin?.s3) {
      request.origin.s3.path = `/${branch}`;
    }
  }

  if (request.uri != `/index.html` && !IS_FILE.test(request.uri)) {
    request.uri = '/index.html'
  }

  return request;
};
