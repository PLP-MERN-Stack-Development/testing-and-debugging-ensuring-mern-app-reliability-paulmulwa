# MERN Bug Tracker Application

A full-stack bug tracking application built with the MERN stack (MongoDB/In-Memory, Express, React, Node.js) demonstrating comprehensive testing and debugging practices.

## 🎯 Project Overview

This project showcases:
- **Backend Testing**: Unit tests for utilities and integration tests for API routes
- **Frontend Testing**: Component tests, integration tests, and error boundary testing
- **Debugging Techniques**: Console logging, Chrome DevTools, Node.js inspector
- **Error Handling**: Express middleware and React Error Boundaries
- **Best Practices**: Clean code structure, comprehensive test coverage, and documentation

## 📋 Features

- ✅ Create, read, update, and delete bugs
- ✅ Update bug status (open, in-progress, resolved)
- ✅ Set bug priority (low, medium, high)
- ✅ Form validation on both frontend and backend
- ✅ Error handling and user feedback
- ✅ Comprehensive test coverage
- ✅ Debugging instrumentation

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **In-Memory Storage** - Simulated database

### Frontend
- **React** - UI library
- **React Testing Library** - Component testing
- **Jest** - Testing framework
- **CSS3** - Styling

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```powershell
Copy-Item .env.example .env
```

### Frontend Setup

1. Navigate to the frontend folder:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

## 🚀 Running the Application

### Start Backend Server

```powershell
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

For development with auto-reload:
```powershell
npm run dev
```

### Start Frontend Application

```powershell
cd frontend
npm start
```

The frontend will run on `http://localhost:3000` and proxy API requests to the backend.

## 🧪 Running Tests

### Backend Tests

Run all backend tests:
```powershell
cd backend
npm test
```

Run tests in watch mode:
```powershell
npm run test:watch
```

Run tests with coverage:
```powershell
npm test -- --coverage
```

### Frontend Tests

Run all frontend tests:
```powershell
cd frontend
npm test
```

Run tests in watch mode:
```powershell
npm run test:watch
```

Run tests with coverage (no watch):
```powershell
npm test -- --coverage --watchAll=false
```

## 📊 Test Coverage

### Backend Tests
- **Unit Tests**: Validation utilities (`utils/validation.js`)
  - Input validation
  - Status validation
  - Data sanitization
  
- **Integration Tests**: API routes (`routes/bugRoutes.js`)
  - GET all bugs
  - GET bug by ID
  - POST create bug
  - PUT update bug
  - DELETE bug
  - Error handling

### Frontend Tests
- **Component Tests**:
  - `BugForm`: Form rendering, validation, submission
  - `BugList`: List rendering, empty states, user interactions
  - `ErrorBoundary`: Error catching and fallback UI
  
- **Integration Tests**:
  - `App`: API integration, loading states, error handling

## 🐛 Debugging Guide

### Backend Debugging

#### 1. Console Logging
The application includes strategic console.log statements:
- API route handlers log incoming requests
- Error middleware logs error details
- Database operations log CRUD actions

#### 2. Node.js Inspector

Start the server with the Node.js debugger:
```powershell
node --inspect server.js
```

Then open Chrome and navigate to `chrome://inspect` to attach the debugger.

#### 3. VSCode Debugging

Create a `.vscode/launch.json` file:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "program": "${workspaceFolder}/backend/server.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

### Frontend Debugging

#### 1. React DevTools
Install the React DevTools browser extension to inspect component hierarchy and state.

#### 2. Chrome DevTools

- **Console**: View console.log messages and errors
- **Network Tab**: Inspect API requests and responses
- **Sources Tab**: Set breakpoints in source code
- **React Tab**: Inspect component props and state

#### 3. Console Logging
The application includes debug logs for:
- API calls (fetch requests)
- State updates
- Error conditions

### Common Debugging Scenarios

#### API Request Failures
1. Open Chrome DevTools → Network tab
2. Check the failed request
3. View request/response details
4. Check backend console for error logs

#### Component Not Rendering
1. Open React DevTools
2. Inspect component tree
3. Check props and state
4. Look for errors in console

#### State Update Issues
1. Add console.log in state update handlers
2. Use React DevTools to track state changes
3. Check for asynchronous timing issues

## 🚨 Error Handling

### Backend Error Handling

Express middleware catches and handles errors:
- **Validation Errors**: Return 400 with error message
- **Not Found**: Return 404 with descriptive message
- **Server Errors**: Return 500 with error details (stack trace in development)

### Frontend Error Handling

- **Error Boundary**: Catches React component errors and displays fallback UI
- **API Error Display**: Shows error banner for failed API calls
- **Form Validation**: Client-side validation with user-friendly error messages

## 🧩 Project Structure

```
mern-bug-tracker/
├── backend/
│   ├── __tests__/
│   │   ├── bugRoutes.test.js
│   │   └── validation.test.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── bugModel.js
│   ├── routes/
│   │   └── bugRoutes.js
│   ├── utils/
│   │   └── validation.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── __tests__/
    │   │   ├── App.test.js
    │   │   ├── BugForm.test.js
    │   │   ├── BugList.test.js
    │   │   └── ErrorBoundary.test.js
    │   ├── components/
    │   │   ├── BugForm.js
    │   │   ├── BugForm.css
    │   │   ├── BugList.js
    │   │   ├── BugList.css
    │   │   ├── ErrorBoundary.js
    │   │   └── ErrorBoundary.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   ├── index.css
    │   └── setupTests.js
    └── package.json
```

## 🎓 Testing Approach

### Test-Driven Development (TDD)
This project demonstrates TDD principles:
1. Write tests first to define expected behavior
2. Implement code to pass tests
3. Refactor while maintaining test coverage

### Testing Strategy

#### Backend
- **Unit Tests**: Test individual functions in isolation
- **Integration Tests**: Test API endpoints with HTTP requests
- **Mocking**: Mock database operations to isolate tests

#### Frontend
- **Component Tests**: Test components in isolation
- **User Interaction Tests**: Simulate user actions (clicks, typing)
- **Integration Tests**: Test component interaction with APIs
- **Error Boundary Tests**: Verify error handling and recovery

### Coverage Goals
- Aim for 80%+ code coverage
- Focus on critical paths and edge cases
- Test both success and failure scenarios

## 🔍 Intentional Bugs for Debugging Practice

The application includes commented-out intentional bugs for debugging practice:

1. **Missing validation** - Uncomment to test error handling
2. **Incorrect API endpoint** - Uncomment to test network error handling
3. **State mutation** - Uncomment to test React rendering issues

Look for `// INTENTIONAL BUG:` comments in the code.

## 📝 API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### Get All Bugs
- **GET** `/bugs`
- **Response**: Array of bug objects

#### Get Bug by ID
- **GET** `/bugs/:id`
- **Response**: Bug object

#### Create Bug
- **POST** `/bugs`
- **Body**: `{ title, description, status?, priority? }`
- **Response**: Created bug object

#### Update Bug
- **PUT** `/bugs/:id`
- **Body**: `{ title?, description?, status?, priority? }`
- **Response**: Updated bug object

#### Delete Bug
- **DELETE** `/bugs/:id`
- **Response**: `{ message: "Bug deleted successfully" }`

## 🚀 Deployment

### Backend
1. Set environment variables
2. Use a production-ready database (MongoDB, PostgreSQL)
3. Deploy to Heroku, Railway, or similar platform

### Frontend
1. Build the production version: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Update API URL to production backend

## 📚 Learning Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Supertest](https://github.com/visionmedia/supertest)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a demonstration project for Week 6: Testing and Debugging in MERN Applications

## 🎯 Evaluation Checklist

- ✅ Comprehensive unit and integration tests
- ✅ Proper test coverage (80%+)
- ✅ Effective debugging techniques demonstrated
- ✅ Well-structured and maintainable code
- ✅ Clear error handling implementation
- ✅ Complete documentation
- ✅ Ready for GitHub submission

---

**Happy Testing and Debugging! 🐛**
