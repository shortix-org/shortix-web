## CI/CD Deployment

This repository uses GitHub Actions for automated deployment.

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | AWS IAM Access Key ID |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret Access Key |

### Required GitHub Variables (Environment-specific)

These can be configured per environment (dev, staging, prod) in **Settings** -> **Environments**.

| Variable | Description |
|---|---|
| `AWS_REGION` | e.g., `us-east-1` |

### Manual Trigger
Go to **Actions** -> **Deploy Frontend** -> **Run workflow**. 
This will build the assets, sync them to S3, and invalidate the CloudFront cache.