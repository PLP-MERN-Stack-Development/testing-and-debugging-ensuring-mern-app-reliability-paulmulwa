# 🚀 Getting Started - MERN Bug Tracker

Welcome! This guide will get you up and running in 5 minutes.

## 📋 Prerequisites

Make sure you have installed:
- ✅ Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- ✅ npm (comes with Node.js)
- ✅ A code editor (VS Code recommended)
- ✅ Git (for version control)

Check your installations:
```powershell
node --version
npm --version
git --version
```

## 🎯 Option 1: Automated Setup (Recommended)

### Windows (PowerShell)
```powershell
cd "c:\Users\Administrator\Desktop\projects\week 6\mern-bug-tracker"
.\setup.ps1
```

This will:
1. Install all backend dependencies
2. Install all frontend dependencies
3. Create .env file
4. Run all tests
5. Show you next steps

## 🔧 Option 2: Manual Setup

### Step 1: Install Backend Dependencies
```powershell
cd "c:\Users\Administrator\Desktop\projects\week 6\mern-bug-tracker\backend"
npm install
```

Wait for installation to complete (may take 1-2 minutes).

### Step 2: Install Frontend Dependencies
```powershell
cd "c:\Users\Administrator\Desktop\projects\week 6\mern-bug-tracker\frontend"
npm install
```

Wait for installation to complete (may take 2-3 minutes).

### Step 3: Create Environment File
```powershell
cd "c:\Users\Administrator\Desktop\projects\week 6\mern-bug-tracker\backend"
Copy-Item .env.example .env
```

## 🏃 Running the Application

You need TWO terminal windows:

### Terminal 1: Backend Server
```powershell
cd "c:\Users\Administrator\Desktop\projects\week 6\mern-bug-tracker\backend"
npm start
```

You should see:
```
Server is running on port 5000
Environment: development
```

### Terminal 2: Frontend App
```powershell
cd "c:\Users\Administrator\Desktop\projects\week 6\mern-bug-tracker\frontend"
npm start
```

Your browser should automatically open to `http://localhost:3000`

If it doesn't, manually open: http://localhost:3000

## ✅ Verify Everything Works

### 1. Backend is Running
Open: http://localhost:5000

You should see:
```json
{
  "message": "Bug Tracker API is running"
}
```

### 2. Frontend is Running
Open: http://localhost:3000

You should see:
- A header with "🐛 Bug Tracker"
- A form to report new bugs
- An empty bug list (initially)

### 3. Test the Application
1. Fill in the bug form:
   - Title: "Test Bug"
   - Description: "This is a test bug"
   - Click "Submit Bug"

2. You should see the bug appear in the list below

3. Try updating the status using the dropdown

4. Try editing the bug

5. Try deleting the bug

## 🧪 Running Tests

### Backend Tests
```powershell
cd backend
npm test
```

Expected output:
```
PASS  __tests__/validation.test.js
PASS  __tests__/bugRoutes.test.js

Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
```

### Frontend Tests
```powershell
cd frontend
npm test -- --watchAll=false
```

Expected output:
```
PASS  src/__tests__/BugForm.test.js
PASS  src/__tests__/BugList.test.js
PASS  src/__tests__/ErrorBoundary.test.js
PASS  src/__tests__/App.test.js

Test Suites: 4 passed, 4 total
Tests:       28 passed, 28 total
```

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with the number you found)
taskkill /PID <PID> /F
```

Or change the port in `backend/.env`:
```
PORT=5001
```

### Dependencies Won't Install

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Tests Failing

**Solution:**
1. Make sure dependencies are installed
2. Try clearing Jest cache:
```powershell
npm test -- --clearCache
```

### Frontend Won't Connect to Backend

**Solution:**
1. Verify backend is running on port 5000
2. Check `frontend/package.json` has: `"proxy": "http://localhost:5000"`
3. Restart the frontend server

## 📚 What's Next?

### 1. Explore the Code
- `backend/routes/bugRoutes.js` - API endpoints
- `backend/__tests__/` - Backend tests
- `frontend/src/App.js` - Main React component
- `frontend/src/__tests__/` - Frontend tests

### 2. Practice Debugging
- Open Chrome DevTools (F12)
- Check the Console, Network, and Sources tabs
- Try the debugging examples in `DEBUGGING_GUIDE.md`

### 3. Run with Coverage
```powershell
# Backend
cd backend
npm test -- --coverage

# Frontend
cd frontend
npm test -- --coverage --watchAll=false
```

### 4. Review Documentation
- `README.md` - Full documentation
- `DEBUGGING_GUIDE.md` - Debugging techniques
- `ASSIGNMENT_SUMMARY.md` - Project overview

### 5. Push to GitHub
```powershell
cd "c:\Users\Administrator\Desktop\projects\week 6\mern-bug-tracker"

git init
git add .
git commit -m "Initial commit: MERN Bug Tracker with comprehensive testing"

# Add your GitHub repository
git remote add origin <your-github-repo-url>
git push -u origin main
```

## 🎓 Learning Path

1. ✅ Get the app running
2. ✅ Test all features manually
3. ✅ Run all tests
4. ✅ Review test files to understand testing approach
5. ✅ Practice debugging techniques
6. ✅ Review code structure and organization
7. ✅ Push to GitHub

## 💡 Quick Reference

### Common Commands

```powershell
# Start backend
cd backend ; npm start

# Start frontend
cd frontend ; npm start

# Run backend tests
cd backend ; npm test

# Run frontend tests
cd frontend ; npm test -- --watchAll=false

# Run with coverage
npm test -- --coverage

# Development mode (auto-reload)
cd backend ; npm run dev
```

### File Structure Overview

```
mern-bug-tracker/
├── backend/              # Node.js + Express backend
│   ├── __tests__/       # Backend tests
│   ├── routes/          # API endpoints
│   ├── models/          # Data models
│   └── utils/           # Helper functions
├── frontend/            # React frontend
│   └── src/
│       ├── components/  # React components
│       └── __tests__/   # Frontend tests
└── Documentation files
```

## 🆘 Need Help?

1. Check `DEBUGGING_GUIDE.md` for debugging tips
2. Review `QUICKSTART.md` for quick commands
3. See `README.md` for full documentation
4. Check `ASSIGNMENT_SUMMARY.md` for project overview

## ✨ Success Indicators

You're all set when:
- ✅ Both servers start without errors
- ✅ App loads at http://localhost:3000
- ✅ You can create, view, update, and delete bugs
- ✅ All 53 tests pass (25 backend + 28 frontend)
- ✅ No errors in browser console

---

**Ready? Let's go! 🚀**

Run the setup script and start building!
