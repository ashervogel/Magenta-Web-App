import React from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
function Counter(props) {
	const count = useSelector((store) => store.count);
  return (
    <div>
      Current Count: {count}
    </div>
  );
}


export default Counter;