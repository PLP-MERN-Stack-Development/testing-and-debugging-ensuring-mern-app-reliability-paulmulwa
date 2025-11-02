# 📁 Project Structure - MERN Bug Tracker

## Complete File Tree

```
mern-bug-tracker/
│
├── 📄 README.md                    # Main documentation
├── 📄 GETTING_STARTED.md           # Quick start guide (START HERE!)
├── 📄 QUICKSTART.md                # Quick reference commands
├── 📄 DEBUGGING_GUIDE.md           # Comprehensive debugging guide
├── 📄 ASSIGNMENT_SUMMARY.md        # Assignment completion summary
├── 📄 .gitignore                   # Git ignore rules
├── 📄 setup.ps1                    # Windows setup script
├── 📄 setup.sh                     # Linux/Mac setup script
│
├── 📂 backend/                     # Backend API (Node.js + Express)
│   │
│   ├── 📄 package.json            # Backend dependencies & scripts
│   ├── 📄 .gitignore              # Backend-specific ignores
│   ├── 📄 .env.example            # Environment variables template
│   ├── 📄 server.js               # Server entry point ⚙️ START HERE
│   ├── 📄 app.js                  # Express app configuration
│   │
│   ├── 📂 routes/
│   │   └── 📄 bugRoutes.js        # CRUD API endpoints
│   │
│   ├── 📂 models/
│   │   └── 📄 bugModel.js         # In-memory data model
│   │
│   ├── 📂 middleware/
│   │   └── 📄 errorHandler.js     # Error handling middleware
│   │
│   ├── 📂 utils/
│   │   ├── 📄 validation.js       # Validation utilities
│   │   └── 📄 debugExamples.js    # Debugging examples
│   │
│   └── 📂 __tests__/               # Backend tests (25 tests)
│       ├── 📄 validation.test.js   # Unit tests (11 tests)
│       └── 📄 bugRoutes.test.js    # Integration tests (14 tests)
│
└── 📂 frontend/                    # Frontend App (React)
    │
    ├── 📄 package.json            # Frontend dependencies & scripts
    ├── 📄 .gitignore              # Frontend-specific ignores
    │
    ├── 📂 public/
    │   └── 📄 index.html          # HTML template
    │
    └── 📂 src/
        │
        ├── 📄 index.js            # React entry point ⚙️ START HERE
        ├── 📄 index.css           # Global styles
        ├── 📄 setupTests.js       # Test configuration
        ├── 📄 App.js              # Main app component
        ├── 📄 App.css             # App styles
        │
        ├── 📂 components/         # React components
        │   ├── 📄 BugForm.js      # Bug creation/edit form
        │   ├── 📄 BugForm.css     # Form styles
        │   ├── 📄 BugList.js      # Bug list display
        │   ├── 📄 BugList.css     # List styles
        │   ├── 📄 ErrorBoundary.js # Error boundary
        │   └── 📄 ErrorBoundary.css # Error boundary styles
        │
        ├── 📂 utils/
        │   └── 📄 debugExamples.js # Frontend debugging examples
        │
        └── 📂 __tests__/           # Frontend tests (28 tests)
            ├── 📄 App.test.js      # App integration tests (6 tests)
            ├── 📄 BugForm.test.js  # Form component tests (9 tests)
            ├── 📄 BugList.test.js  # List component tests (8 tests)
            └── 📄 ErrorBoundary.test.js # Error boundary tests (5 tests)
```

## 📊 Statistics

### File Count
- **Total Files:** 38
- **Backend Files:** 12
- **Frontend Files:** 15
- **Documentation Files:** 6
- **Configuration Files:** 5

### Code Distribution
- **Backend Code:** 8 files
- **Backend Tests:** 2 files (25 tests)
- **Frontend Code:** 9 files
- **Frontend Tests:** 4 files (28 tests)
- **Documentation:** 6 markdown files

### Test Coverage
- **Total Tests:** 53
- **Backend Unit Tests:** 11
- **Backend Integration Tests:** 14
- **Frontend Component Tests:** 28

## 🎯 Key Files to Understand

### Backend Entry Points
1. **`backend/server.js`** - Starts the server
2. **`backend/app.js`** - Configures Express app
3. **`backend/routes/bugRoutes.js`** - API endpoints

### Frontend Entry Points
1. **`frontend/src/index.js`** - React entry point
2. **`frontend/src/App.js`** - Main app component
3. **`frontend/src/components/`** - React components

### Testing Files
1. **`backend/__tests__/`** - Backend tests
2. **`frontend/src/__tests__/`** - Frontend tests

### Documentation
1. **`GETTING_STARTED.md`** - Start here! 🚀
2. **`README.md`** - Complete guide
3. **`DEBUGGING_GUIDE.md`** - Debugging help
4. **`ASSIGNMENT_SUMMARY.md`** - Project overview

## 🔄 Data Flow

```
User Input (Browser)
        ↓
   React Components (Frontend)
        ↓
   API Calls (fetch)
        ↓
   Express Routes (Backend)
        ↓
   Validation (Utils)
        ↓
   Bug Model (In-Memory DB)
        ↓
   Response (JSON)
        ↓
   React State Update
        ↓
   UI Re-render
```

## 🧪 Testing Flow

```
Backend Testing:
   Jest → Supertest → API Routes → Validation → Model

Frontend Testing:
   Jest → React Testing Library → Components → User Events
```

## 📦 Dependencies

### Backend (package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "nodemon": "^3.0.1"
  }
}
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3"
  }
}
```

## 🎨 Component Hierarchy

```
App (Main Container)
├── ErrorBoundary (Error Handling)
│   ├── Header
│   ├── Error Banner (conditional)
│   ├── BugForm (Create/Edit)
│   │   ├── Title Input
│   │   ├── Description Textarea
│   │   ├── Status Select
│   │   ├── Priority Select
│   │   └── Submit/Cancel Buttons
│   │
│   ├── Loading State (conditional)
│   │
│   ├── BugList (Display)
│   │   └── BugCard (foreach bug)
│   │       ├── Bug Header
│   │       ├── Bug Badges
│   │       ├── Bug Description
│   │       ├── Bug Metadata
│   │       └── Bug Actions
│   │           ├── Status Dropdown
│   │           ├── Edit Button
│   │           └── Delete Button
│   │
│   └── Footer
```

## 🛣️ API Routes

```
GET    /                    - API health check
GET    /api/bugs           - Get all bugs
GET    /api/bugs/:id       - Get bug by ID
POST   /api/bugs           - Create new bug
PUT    /api/bugs/:id       - Update bug
DELETE /api/bugs/:id       - Delete bug
```

## 📚 Learning Path by Files

### Day 1: Basic Understanding
1. Read `GETTING_STARTED.md`
2. Run `setup.ps1`
3. Explore `backend/server.js`
4. Explore `frontend/src/App.js`

### Day 2: Backend Deep Dive
5. Study `backend/routes/bugRoutes.js`
6. Study `backend/models/bugModel.js`
7. Study `backend/utils/validation.js`
8. Read `backend/__tests__/validation.test.js`

### Day 3: Frontend Deep Dive
9. Study `frontend/src/components/BugForm.js`
10. Study `frontend/src/components/BugList.js`
11. Study `frontend/src/components/ErrorBoundary.js`
12. Read `frontend/src/__tests__/BugForm.test.js`

### Day 4: Testing
13. Run all tests with coverage
14. Study test patterns
15. Practice debugging techniques
16. Review `DEBUGGING_GUIDE.md`

### Day 5: Review & Submit
17. Test all features manually
18. Review all documentation
19. Push to GitHub
20. Complete assignment submission

## 🎯 Quick Navigation

| Need to... | Go to... |
|------------|----------|
| Get started quickly | `GETTING_STARTED.md` |
| Understand the project | `README.md` |
| Learn debugging | `DEBUGGING_GUIDE.md` |
| See quick commands | `QUICKSTART.md` |
| Check completion | `ASSIGNMENT_SUMMARY.md` |
| Modify API endpoints | `backend/routes/bugRoutes.js` |
| Change UI components | `frontend/src/components/` |
| Add tests | `__tests__/` folders |
| Fix validation | `backend/utils/validation.js` |
| Handle errors | `backend/middleware/errorHandler.js` |

---

**Happy Coding! 🚀**
