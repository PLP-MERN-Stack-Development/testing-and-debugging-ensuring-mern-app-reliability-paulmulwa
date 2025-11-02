#!/bin/bash

# MERN Bug Tracker - Setup Script (Linux/Mac)
# Run this script to install all dependencies and verify the setup

echo "========================================"
echo "  MERN Bug Tracker - Setup Script"
echo "========================================"
echo ""

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
echo "Project Root: $PROJECT_ROOT"
echo ""

# Install Backend Dependencies
echo "Step 1: Installing Backend Dependencies..."
cd "$PROJECT_ROOT/backend"
if [ -f "package.json" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo "✓ Backend dependencies installed successfully!"
    else
        echo "✗ Failed to install backend dependencies"
        exit 1
    fi
else
    echo "✗ Backend package.json not found!"
    exit 1
fi

echo ""

# Install Frontend Dependencies
echo "Step 2: Installing Frontend Dependencies..."
cd "$PROJECT_ROOT/frontend"
if [ -f "package.json" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo "✓ Frontend dependencies installed successfully!"
    else
        echo "✗ Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "✗ Frontend package.json not found!"
    exit 1
fi

echo ""

# Create .env file if it doesn't exist
echo "Step 3: Setting up environment variables..."
cd "$PROJECT_ROOT/backend"
if [ ! -f ".env" ]; then
    cp ".env.example" ".env"
    echo "✓ Created .env file from .env.example"
else
    echo "✓ .env file already exists"
fi

echo ""

# Run Backend Tests
echo "Step 4: Running Backend Tests..."
cd "$PROJECT_ROOT/backend"
npm test
if [ $? -eq 0 ]; then
    echo "✓ All backend tests passed!"
else
    echo "⚠ Some backend tests failed - please review"
fi

echo ""

# Run Frontend Tests
echo "Step 5: Running Frontend Tests..."
cd "$PROJECT_ROOT/frontend"
npm test -- --watchAll=false
if [ $? -eq 0 ]; then
    echo "✓ All frontend tests passed!"
else
    echo "⚠ Some frontend tests failed - please review"
fi

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Start the backend server:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Open your browser to http://localhost:3000"
echo ""
echo "For more information, see README.md or QUICKSTART.md"

cd "$PROJECT_ROOT"
