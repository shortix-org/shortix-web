## CI/CD Deployment

This repository uses GitHub Actions for automated deployment.

### GitHub Secrets Required

Configure the following secrets in your GitHub repository settings:

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | AWS IAM Access Key ID |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret Access Key |
| `AWS_REGION` | e.g., `us-east-1` |
| `S3_WEBSITE_BUCKET` | The S3 bucket name for web hosting |
| `CLOUDFRONT_DISTRIBUTION_ID` | The ID of the CloudFront distribution to invalidate |

### Manual Trigger
Go to **Actions** -> **Deploy Frontend** -> **Run workflow**. 
This will build the assets, sync them to S3, and invalidate the CloudFront cache.