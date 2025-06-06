#!/bin/bash

echo "🚀 Setting up Strapi for Railway deployment..."

# Create Strapi project optimized for Railway
npx create-strapi-app@latest education-cms --quickstart --no-run

cd education-cms

echo "📦 Installing additional dependencies..."
npm install pg --save

echo "🔧 Configuring for Railway..."

# Create Railway-specific files
echo "Creating railway.toml..."
cat > railway.toml << 'EOF'
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[build.environment]
NODE_VERSION = "18"
EOF

echo "✅ Strapi project ready for Railway!"
echo ""
echo "Next steps:"
echo "1. cd education-cms"
echo "2. Push to GitHub"
echo "3. Connect to Railway"
echo "4. Deploy automatically!"
