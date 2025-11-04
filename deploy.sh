#!/bin/bash

# Deploy script for Netlify
# This script handles both build and deployment

set -e  # Exit on error

echo "🚀 Starting Netlify deployment process..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if this is production deployment
if [ "$1" == "prod" ] || [ "$1" == "production" ]; then
    echo "🌐 Deploying to PRODUCTION..."
    netlify deploy --prod
else
    echo "🧪 Deploying to PREVIEW..."
    netlify deploy
fi

echo "✅ Deployment complete!"
