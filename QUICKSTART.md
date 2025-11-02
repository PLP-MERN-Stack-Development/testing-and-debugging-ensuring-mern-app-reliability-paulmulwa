# Quick Start Guide

## Installation & Setup

### 1. Backend Setup
```powershell
cd backend
npm install
Copy-Item .env.example .env
```

### 2. Frontend Setup
```powershell
cd frontend
npm install
```

## Running the Application

### Start Backend (Terminal 1)
```powershell
cd backend
npm start
```
Server runs on: http://localhost:5000

### Start Frontend (Terminal 2)
```powershell
cd frontend
npm start
```
App opens at: http://localhost:3000

## Running Tests

### Backend Tests
```powershell
cd backend
npm test
```

### Frontend Tests
```powershell
cd frontend
npm test -- --watchAll=false
```

## Quick Commands

```powershell
# Backend
cd backend
npm install          # Install dependencies
npm start           # Start server
npm run dev         # Start with nodemon (auto-reload)
npm test            # Run tests
npm test -- --coverage  # Run tests with coverage

# Frontend
cd frontend
npm install          # Install dependencies
npm start           # Start development server
npm test            # Run tests in watch mode
npm test -- --watchAll=false  # Run tests once
npm run build       # Build for production
```

## Debugging

### Backend Debugging
```powershell
# With Node inspector
node --inspect backend/server.js

# Then open Chrome and go to: chrome://inspect
```

### Frontend Debugging
- Open Chrome DevTools (F12)
- Install React DevTools extension
- Check Console, Network, and Sources tabs

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend app loads at http://localhost:3000
- [ ] Can create a new bug
- [ ] Can view list of bugs
- [ ] Can update bug status
- [ ] Can edit a bug
- [ ] Can delete a bug
- [ ] Form validation works
- [ ] Error messages display correctly
- [ ] All backend tests pass
- [ ] All frontend tests pass

## Project Structure

```
mern-bug-tracker/
├── backend/
│   ├── __tests__/        # Backend tests
│   ├── middleware/       # Express middleware
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app
│   └── server.js        # Server entry point
└── frontend/
    ├── public/          # Static files
    └── src/
        ├── __tests__/   # Frontend tests
        ├── components/  # React components
        ├── App.js       # Main app component
        └── index.js     # Entry point
```

## Common Issues

### Port Already in Use
```powershell
# Windows: Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

### CORS Errors
- Ensure backend is running
- Check proxy setting in frontend/package.json

### Tests Failing
```powershell
# Clear cache and reinstall
cd backend
Remove-Item -Recurse -Force node_modules
npm install

cd ../frontend
Remove-Item -Recurse -Force node_modules
npm install
```

## Git Commands

```powershell
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: MERN Bug Tracker with testing"

# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

## Next Steps

1. ✅ Run both backend and frontend
2. ✅ Test all features manually
3. ✅ Run all tests
4. ✅ Review test coverage
5. ✅ Practice debugging techniques
6. ✅ Push to GitHub

For detailed information, see [README.md](README.md) and [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md)
