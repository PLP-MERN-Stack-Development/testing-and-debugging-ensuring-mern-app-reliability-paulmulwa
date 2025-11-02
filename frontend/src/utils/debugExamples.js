/**
 * DEBUGGING EXAMPLES FOR FRONTEND
 * This file contains intentional bugs for debugging practice
 */

/**
 * Example 1: Infinite loop in useEffect (Intentional Bug)
 * Uncomment to see infinite re-renders
 */
export function InfiniteLoopExample() {
  // INTENTIONAL BUG:
  /*
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Missing dependency array causes infinite loop
    setCount(count + 1);
  });
  
  return <div>Count: {count}</div>;
  */
  
  // FIXED VERSION: Add dependency array
  /*
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1);
  }, []); // Empty array means run once on mount
  
  return <div>Count: {count}</div>;
  */
}

/**
 * Example 2: Incorrect event handler (Intentional Bug)
 */
export function IncorrectEventHandler() {
  // INTENTIONAL BUG:
  /*
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  // Calling function immediately instead of passing reference
  return <button onClick={handleClick()}>Click Me</button>;
  */
  
  // FIXED VERSION:
  /*
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  return <button onClick={handleClick}>Click Me</button>;
  */
}

/**
 * Example 3: State mutation (Intentional Bug)
 */
export function StateMutationExample() {
  // INTENTIONAL BUG:
  /*
  const [items, setItems] = useState([1, 2, 3]);
  
  const addItem = () => {
    items.push(4); // Mutating state directly
    setItems(items); // React won't detect the change
  };
  
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
  */
  
  // FIXED VERSION:
  /*
  const [items, setItems] = useState([1, 2, 3]);
  
  const addItem = () => {
    setItems([...items, 4]); // Create new array
  };
  
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
  */
}

/**
 * Example 4: Missing null check (Intentional Bug)
 */
export function MissingNullCheck({ user }) {
  // INTENTIONAL BUG:
  /*
  // Will crash if user is null/undefined
  return <div>Welcome, {user.name}!</div>;
  */
  
  // FIXED VERSION:
  /*
  if (!user) {
    return <div>Please log in</div>;
  }
  return <div>Welcome, {user.name}!</div>;
  */
}

/**
 * Frontend Debugging Tips:
 * 
 * 1. React DevTools:
 *    - Install React DevTools extension
 *    - Inspect component hierarchy
 *    - View component props and state
 *    - Track which components re-render
 * 
 * 2. Console Debugging:
 *    - console.log() for general debugging
 *    - console.table() for arrays and objects
 *    - console.trace() to see call stack
 *    - console.time() / console.timeEnd() for performance
 * 
 * 3. Chrome DevTools:
 *    - Network tab: Check API calls and responses
 *    - Console tab: View errors and warnings
 *    - Sources tab: Set breakpoints in code
 *    - Elements tab: Inspect DOM and styles
 * 
 * 4. Common React Bugs:
 *    - Missing dependency arrays in useEffect
 *    - Calling functions in JSX instead of passing reference
 *    - Mutating state directly
 *    - Missing null/undefined checks
 *    - Incorrect key props in lists
 * 
 * 5. Debugging Steps:
 *    a. Identify where the error occurs
 *    b. Add console.log to trace execution
 *    c. Check component props and state
 *    d. Verify API responses in Network tab
 *    e. Set breakpoints and step through code
 *    f. Check for common React pitfalls
 */
