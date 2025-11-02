/**
 * DEBUGGING EXAMPLE FILE
 * This file contains intentional bugs for debugging practice
 * Uncomment bugs one at a time to practice debugging techniques
 */

const bugDB = require('../models/bugModel');

/**
 * Example 1: Missing null check (Intentional Bug)
 * Purpose: Practice using debugger and console.log to trace undefined values
 */
function processTitle(bug) {
  // INTENTIONAL BUG: Uncomment the line below to introduce a bug
  // return bug.title.toUpperCase(); // Will crash if bug.title is undefined
  
  // FIXED VERSION:
  if (!bug || !bug.title) {
    console.error('DEBUG: Invalid bug object or missing title', bug);
    return '';
  }
  return bug.title.toUpperCase();
}

/**
 * Example 2: Off-by-one error in loop (Intentional Bug)
 * Purpose: Practice using breakpoints and step-through debugging
 */
function getBugsByPriority(priority) {
  const bugs = bugDB.getAll();
  const filtered = [];
  
  // INTENTIONAL BUG: Uncomment the line below (and comment the correct one)
  // for (let i = 0; i <= bugs.length; i++) { // Will access undefined at bugs.length
  
  // FIXED VERSION:
  for (let i = 0; i < bugs.length; i++) {
    if (bugs[i].priority === priority) {
      filtered.push(bugs[i]);
    }
  }
  
  return filtered;
}

/**
 * Example 3: Async/Await error handling (Intentional Bug)
 * Purpose: Practice debugging async code and catching errors
 */
async function fetchBugWithTimeout(id) {
  // INTENTIONAL BUG: Uncomment to simulate network timeout
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  // throw new Error('Request timeout');
  
  // FIXED VERSION:
  try {
    const bug = await bugDB.getById(id);
    if (!bug) {
      console.warn('DEBUG: Bug not found with id:', id);
      throw new Error('Bug not found');
    }
    return bug;
  } catch (error) {
    console.error('DEBUG: Error fetching bug:', error);
    throw error;
  }
}

/**
 * Example 4: State mutation issue (Intentional Bug)
 * Purpose: Practice debugging React state issues
 */
function updateBugStatus(bugs, id, newStatus) {
  // INTENTIONAL BUG: Uncomment to mutate original array
  // const bug = bugs.find(b => b.id === id);
  // bug.status = newStatus; // Mutates original object
  // return bugs;
  
  // FIXED VERSION: Create new array and objects
  return bugs.map(bug => 
    bug.id === id 
      ? { ...bug, status: newStatus }
      : bug
  );
}

/**
 * Debugging Tips:
 * 
 * 1. Console Logging:
 *    - Add console.log() before and after suspected problem areas
 *    - Log variable values, function parameters, and return values
 *    - Use console.error() for errors and console.warn() for warnings
 * 
 * 2. Chrome DevTools:
 *    - Open DevTools (F12)
 *    - Use Sources tab to set breakpoints
 *    - Use Network tab to inspect API calls
 *    - Use Console tab to run code snippets
 * 
 * 3. Node.js Inspector:
 *    - Run: node --inspect server.js
 *    - Open chrome://inspect in Chrome
 *    - Click "inspect" to open debugger
 *    - Set breakpoints and step through code
 * 
 * 4. VSCode Debugging:
 *    - Set breakpoints by clicking left of line numbers
 *    - Press F5 to start debugging
 *    - Use Step Over (F10), Step Into (F11), Continue (F5)
 * 
 * 5. React DevTools:
 *    - Install React DevTools browser extension
 *    - Inspect component tree
 *    - View props and state
 *    - Track component re-renders
 */

module.exports = {
  processTitle,
  getBugsByPriority,
  fetchBugWithTimeout,
  updateBugStatus
};
