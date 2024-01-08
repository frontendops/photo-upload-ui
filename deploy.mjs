import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const getCloudFormationOuputValue = (key) => {
  const command = `aws cloudformation describe-stacks --stack-name photo-app-react --no-paginate --no-cli-pager --output text --query "Stacks[0].Outputs[?OutputKey=='${key}'].OutputValue"`;

  return execSync(command, {encoding: 'utf-8'});
};

const uploadFiles = () => {
  const sourceDir = path.resolve(path.join(__dirname, "./dist"));
  const s3BucketName = getCloudFormationOuputValue("PhotoAppS3BucketName");

  console.log('the s3 bucket name')
  console.log(s3BucketName)

  console.log(`Uploading files from ${sourceDir} to s3://${s3BucketName}`);
  execSync(`aws s3 sync ${sourceDir} s3://${s3BucketName}`, { stdio: "inherit" }, {encoding: 'utf-8'});
};

const clearCloudFrontCache = () => {
  const distributionId = getCloudFormationOuputValue("CloudFrontDistributionId");
  console.log(`Clearing CloudFront cache for distribution ${distributionId}`);

  const command = `
    aws cloudfront create-invalidation --no-paginate --no-cli-pager --paths "/*" --distribution-id ${distributionId}
    `;
  execSync(command, { stdio: "inherit" }, {encoding: 'utf-8'});
};

uploadFiles();
clearCloudFrontCache();

const domain = getCloudFormationOuputValue("PhotoAppDomain");
console.log(`Deployment done, visit https://${domain}`);