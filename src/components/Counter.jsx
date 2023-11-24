import React, { useReducer } from 'react';

const reducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return { count: state.count + 1 };
  } else if (action.type === 'DECREMENT') {
    return { count: state.count - 1 };
  } else if (action.type === 'RESET') {
    return { count: 0 };
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
  });

  return (
    <div>
      <h1>The (Final?) Counter</h1>
      <p id="actions" style={{ textAlign: 'center' }}>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
        <br />
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </p>
      <p id="counter" style={{ fontSize: '40px', textAlign: 'center' }}>
        {state.count}
      </p>
    </div>
  );
};

export default Counter;
