#!/bin/bash
set -e

# Configuration
BUCKET_NAME="shortix-persistence-auth-websitebucket-lxt2krznsppd"
DISTRIBUTION_ID="E3LW91USGJHZGM"
REGION="us-east-1"

echo "🚀 Building shortix-web..."
npm run build

echo "📦 Syncing to S3 ($BUCKET_NAME)..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --region $REGION

echo "🧹 Invalidating CloudFront cache ($DISTRIBUTION_ID)..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --region $REGION

echo "✅ Deployment complete!"
echo "🌐 URL: https://d12ms00y4bw6gr.cloudfront.net"
