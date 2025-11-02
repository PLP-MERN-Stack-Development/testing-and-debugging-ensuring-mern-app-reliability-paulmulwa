# Debugging Guide - MERN Bug Tracker

## 🔍 Overview

This guide provides comprehensive debugging techniques for the MERN Bug Tracker application, covering both backend and frontend debugging strategies.

## 🎯 Debugging Scenarios

### Backend Debugging

#### Scenario 1: API Endpoint Not Working

**Symptoms:**
- 404 Not Found errors
- Request not reaching the server
- Incorrect response data

**Debugging Steps:**

1. **Check Server Console**
   ```powershell
   cd backend
   npm run dev
   ```
   Look for startup errors and request logs.

2. **Verify Route Registration**
   - Check `app.js` for route mounting
   - Ensure routes are defined correctly in `routes/bugRoutes.js`

3. **Test with cURL or Postman**
   ```powershell
   # Test GET endpoint
   curl http://localhost:5000/api/bugs
   
   # Test POST endpoint
   curl -X POST http://localhost:5000/api/bugs `
     -H "Content-Type: application/json" `
     -d '{"title":"Test","description":"Test bug"}'
   ```

4. **Add Debug Logging**
   ```javascript
   router.get('/', async (req, res, next) => {
     console.log('DEBUG: GET /api/bugs called');
     console.log('DEBUG: Request headers:', req.headers);
     // ... rest of code
   });
   ```

#### Scenario 2: Validation Errors

**Symptoms:**
- 400 Bad Request errors
- Unexpected validation failures
- Data not being saved

**Debugging Steps:**

1. **Check Validation Logic**
   - Review `utils/validation.js`
   - Add console.log to see what's being validated:
   ```javascript
   function validateBug(bug) {
     console.log('DEBUG: Validating bug:', bug);
     const errors = [];
     // ... validation logic
     console.log('DEBUG: Validation result:', { valid: errors.length === 0, errors });
     return { valid: errors.length === 0, errors };
   }
   ```

2. **Check Request Body**
   ```javascript
   router.post('/', async (req, res, next) => {
     console.log('DEBUG: Request body:', req.body);
     // ... rest of code
   });
   ```

3. **Run Unit Tests**
   ```powershell
   npm test -- validation.test.js
   ```

#### Scenario 3: Database/Model Issues

**Symptoms:**
- Data not persisting
- Incorrect data returned
- State management issues

**Debugging Steps:**

1. **Check Model Operations**
   ```javascript
   const bugDB = require('./models/bugModel');
   
   // Add debug logging
   bugDB.create = async (data) => {
     console.log('DEBUG: Creating bug with data:', data);
     const bug = new Bug(data);
     bugs.push(bug);
     console.log('DEBUG: Created bug:', bug);
     console.log('DEBUG: All bugs:', bugs);
     return bug;
   };
   ```

2. **Verify Data Structure**
   - Check that data matches expected schema
   - Verify IDs are being generated correctly

3. **Use Node.js Debugger**
   ```powershell
   node --inspect server.js
   ```
   Then open Chrome and go to `chrome://inspect`

### Frontend Debugging

#### Scenario 1: Component Not Rendering

**Symptoms:**
- Blank screen
- Component missing from DOM
- Error in console

**Debugging Steps:**

1. **Check Console for Errors**
   - Open Chrome DevTools (F12)
   - Look for red error messages

2. **Add Console Logs**
   ```javascript
   function BugList({ bugs, onEdit, onDelete }) {
     console.log('DEBUG: BugList rendering with bugs:', bugs);
     console.log('DEBUG: bugs.length:', bugs.length);
     
     // ... rest of component
   }
   ```

3. **Use React DevTools**
   - Install React DevTools extension
   - Inspect component tree
   - Check props being passed

4. **Verify Conditional Rendering**
   ```javascript
   {bugs.length === 0 ? (
     <div>No bugs</div>
   ) : (
     <BugList bugs={bugs} />
   )}
   ```

#### Scenario 2: State Not Updating

**Symptoms:**
- UI not reflecting state changes
- Old data displayed
- Buttons not working

**Debugging Steps:**

1. **Check State Updates**
   ```javascript
   const [bugs, setBugs] = useState([]);
   
   const addBug = (newBug) => {
     console.log('DEBUG: Current bugs:', bugs);
     console.log('DEBUG: Adding bug:', newBug);
     setBugs([...bugs, newBug]);
     console.log('DEBUG: Updated bugs:', [...bugs, newBug]);
   };
   ```

2. **Verify State Immutability**
   ```javascript
   // WRONG - Mutates state
   bugs.push(newBug);
   setBugs(bugs);
   
   // CORRECT - Creates new array
   setBugs([...bugs, newBug]);
   ```

3. **Use React DevTools Profiler**
   - Record component renders
   - Check which components re-render
   - Identify unnecessary renders

#### Scenario 3: API Calls Failing

**Symptoms:**
- Network errors
- Timeout errors
- CORS errors

**Debugging Steps:**

1. **Check Network Tab**
   - Open DevTools → Network tab
   - Look for failed requests (red)
   - Check request/response details

2. **Add Fetch Debugging**
   ```javascript
   const fetchBugs = async () => {
     try {
       console.log('DEBUG: Fetching bugs from:', API_URL);
       const response = await fetch(API_URL);
       console.log('DEBUG: Response status:', response.status);
       console.log('DEBUG: Response ok:', response.ok);
       
       const data = await response.json();
       console.log('DEBUG: Response data:', data);
       setBugs(data);
     } catch (err) {
       console.error('DEBUG: Fetch error:', err);
       console.error('DEBUG: Error stack:', err.stack);
     }
   };
   ```

3. **Check CORS Configuration**
   - Verify backend has CORS enabled
   - Check proxy configuration in `package.json`

4. **Test API Separately**
   - Test backend endpoint directly
   - Verify response format

#### Scenario 4: Form Validation Issues

**Symptoms:**
- Form submits with invalid data
- Validation messages not showing
- Error messages incorrect

**Debugging Steps:**

1. **Check Validation Logic**
   ```javascript
   const validateForm = () => {
     console.log('DEBUG: Validating form data:', formData);
     const newErrors = {};
     
     if (!formData.title.trim()) {
       console.log('DEBUG: Title validation failed');
       newErrors.title = 'Title is required';
     }
     
     console.log('DEBUG: Validation errors:', newErrors);
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
   ```

2. **Check Form State**
   ```javascript
   const handleChange = (e) => {
     const { name, value } = e.target;
     console.log('DEBUG: Form field changed:', name, value);
     setFormData(prev => ({
       ...prev,
       [name]: value
     }));
   };
   ```

## 🛠️ Debugging Tools

### Chrome DevTools

#### Console Tab
- View console.log messages
- Execute JavaScript code
- Check for errors and warnings

**Useful Console Methods:**
```javascript
console.log('Simple message');
console.error('Error message');
console.warn('Warning message');
console.table([{id: 1, name: 'Bug 1'}, {id: 2, name: 'Bug 2'}]);
console.group('Group Name');
console.log('Message 1');
console.log('Message 2');
console.groupEnd();
console.time('Operation');
// ... code to measure
console.timeEnd('Operation');
```

#### Network Tab
- Monitor API requests
- Check request/response headers
- View response data
- Measure request timing

#### Sources Tab
- Set breakpoints
- Step through code
- Watch variables
- View call stack

#### React DevTools
- Inspect component hierarchy
- View component props and state
- Track component updates
- Measure component performance

### Node.js Debugger

#### Using --inspect Flag
```powershell
node --inspect server.js
```

1. Open Chrome and navigate to `chrome://inspect`
2. Click "inspect" under your Node.js process
3. Use DevTools to debug server-side code

#### Using VSCode Debugger

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/server.js",
      "console": "integratedTerminal"
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Frontend",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/frontend/src"
    }
  ]
}
```

## 📋 Debugging Checklist

### Before Starting Debugging

- [ ] Can you reproduce the issue consistently?
- [ ] What changed recently that might have caused this?
- [ ] Is the issue in frontend, backend, or both?
- [ ] Are there any error messages in the console?

### During Debugging

- [ ] Add strategic console.log statements
- [ ] Check Network tab for API issues
- [ ] Verify data at each step
- [ ] Use breakpoints to pause execution
- [ ] Check state and props in React DevTools

### After Fixing

- [ ] Remove or comment out debug code
- [ ] Add tests to prevent regression
- [ ] Document the issue and fix
- [ ] Consider if error handling needs improvement

## 🎓 Best Practices

### Logging Best Practices

1. **Use Descriptive Prefixes**
   ```javascript
   console.log('DEBUG: Fetching bugs');
   console.log('ERROR: Failed to create bug');
   console.log('INFO: Server started on port 5000');
   ```

2. **Log Relevant Context**
   ```javascript
   console.log('DEBUG: Creating bug', { title, description, status });
   ```

3. **Use Appropriate Log Levels**
   - `console.log()` - General information
   - `console.warn()` - Warnings
   - `console.error()` - Errors
   - `console.debug()` - Detailed debug info

4. **Remove Debug Logs Before Production**
   - Use a logging library that can be configured per environment
   - Comment out debug logs
   - Use build-time code removal

### Error Handling Best Practices

1. **Always Catch Errors**
   ```javascript
   try {
     await fetchData();
   } catch (error) {
     console.error('Error fetching data:', error);
     setError(error.message);
   }
   ```

2. **Provide Meaningful Error Messages**
   ```javascript
   if (!bug) {
     throw new Error(`Bug with ID ${id} not found`);
   }
   ```

3. **Use Error Boundaries in React**
   ```javascript
   <ErrorBoundary>
     <App />
   </ErrorBoundary>
   ```

## 🔧 Common Issues and Solutions

### Issue: "Cannot read property of undefined"

**Solution:**
- Add null checks
- Use optional chaining: `user?.name`
- Provide default values: `user.name || 'Unknown'`

### Issue: CORS Error

**Solution:**
- Enable CORS in backend: `app.use(cors())`
- Add proxy in frontend `package.json`: `"proxy": "http://localhost:5000"`

### Issue: Infinite Loop in useEffect

**Solution:**
- Add dependency array
- Only include necessary dependencies
- Use useCallback for functions

### Issue: State Not Updating

**Solution:**
- Don't mutate state directly
- Use spread operator for arrays/objects
- Use functional setState for state based on previous state

## 📚 Additional Resources

- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [React DevTools Guide](https://react.dev/learn/react-developer-tools)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [JavaScript Debugging Tips](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong)

---

**Remember: Good debugging is about being systematic, patient, and thorough. Don't guess—gather evidence!** 🔍
