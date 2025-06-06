#!/bin/bash

# Create Strapi project
echo "🚀 Creating Strapi CMS for Education Website..."

# Create new Strapi project
npx create-strapi-app@latest education-cms --quickstart

echo "✅ Strapi project created!"
echo "📁 Navigate to: cd education-cms"
echo "🌐 Admin panel will be at: http://localhost:1337/admin"
echo ""
echo "Next steps:"
echo "1. cd education-cms"
echo "2. npm run develop"
echo "3. Create your admin account"
echo "4. Follow the content type setup below"
