#!/bin/bash

# 🛠️ Build and Deploy Scripts

echo "🚀 HRMS Lite - Build Script"
echo "================================"
echo ""

# Check if we're in the root directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Building Frontend..."
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    npm install
fi

# Build frontend
echo "🔨 Building frontend for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
    echo "📁 Build output: frontend/dist"
    echo ""
else
    echo "❌ Frontend build failed!"
    cd ..
    exit 1
fi

cd ..

echo ""
echo "🔙 Checking Backend..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📥 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing backend dependencies..."
pip install -r requirements.txt --quiet

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed!"
else
    echo "❌ Backend dependency installation failed!"
    cd ..
    exit 1
fi

cd ..

echo ""
echo "✨ Build Complete!"
echo "================================"
echo ""

echo "📋 Next Steps:"
echo "  1. Deploy backend to Railway/Render/Heroku"
echo "  2. Deploy frontend to Vercel/Netlify"
echo "  3. Set environment variables on platforms"
echo "  4. Update CORS configuration"
echo ""
echo "  📚 See DEPLOYMENT.md for detailed instructions"
echo ""
