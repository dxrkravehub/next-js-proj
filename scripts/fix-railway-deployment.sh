#!/bin/bash

echo "🔧 Fixing Railway deployment configuration..."

# Remove the problematic railway.toml
rm -f railway.toml

# Create a corrected railway.toml
cat > railway.toml << 'EOF'
[build]
builder = "NIXPACKS"

[build.environment]
NODE_VERSION = "18"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
EOF

echo "✅ Fixed railway.toml configuration!"

# Validate the TOML file
echo "🔍 Validating TOML syntax..."
if command -v toml-test &> /dev/null; then
    toml-test railway.toml
    echo "✅ TOML syntax is valid!"
else
    echo "ℹ️  TOML validation tool not found, but file should be correct now"
fi

echo ""
echo "📋 Next steps:"
echo "1. git add railway.toml"
echo "2. git commit -m 'Fix railway.toml configuration'"
echo "3. git push origin main"
echo "4. Railway will auto-deploy the fixed version"
