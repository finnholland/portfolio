## Overview

This is a simple repo where I update my expertise and projects (also on GitHub) for my portfolio.

### Setup
To create your own copy of this, you can fork the repo and install the dependencies with
```
git clone https://github.com/finnholland/portfolio.git
```
```
cd portfolio 
```
```
npm i
```
and finally 
```
npm run dev
```

This will create the webpage on localhost:3000.
You will obviously have all of my details there and may want to update it to use yours unless you want to apply for jobs on my behalf :)

### Updating your details
I've tried to keep the project as simple as possible only requiring updates in a few files when you want to add some things in. Of course if you feel like changing it up a bit you can.
- These files are the json files inside `/public/info/*.json`
*You can find the types for these json objects inside `types.ts`*
- To add your own image, simply put your image in the repo as `/public/images/profile.jpg`
*you may have to delete the .next folder to see the change (it caches)*
- Change the LinkedIn and GitHub link in `/components/profile/profile.tsx` to your own.

That should be looking much more like your resumé!

### Updating for your infra
- Change your AWS details in `cdk-infra/bin/app.ts` the key values are `account`, `cloudfrontCertificateArn`, and the `subDomainName`, `domainName`, along with any optional extra domains you want.
- Update the bucket name in `package.json scripts` from `www.finnholland.dev` to your bucket name (`${subDomainName}.${domainName}`)
- Run `cd cdk-infra && cdk deploy portfolio` to deploy the infra to AWS

### Deploying
The way I did it was using `@aligent/static-hosting` which is an open-source repo we use at my current company to assist in in creating the infrastructure to host SWAs in AWS. 

I haven't set up CI/CD on this but may look into GitHub Actions, for now you can run `npm run bnd` to build and deploy to your S3 bucket
However you can choose whichever hosting you want, even bare metal docker.

For Amplify you can see my repo [fromeroad](https://github.com/finnholland/fromeroad/blob/master/terraform/Instructions.md#amplify) (excluding env vars) in order to see how to host it on AWS Amplify.
