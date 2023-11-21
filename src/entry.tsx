import React, { useEffect } from 'react';
import './index.less'

const App: React.FC = () => {

  console.log(11111)

  useEffect(() => {
    const obj = { a: 1 }
    console.log(obj?.a);
  }, [])
  

  return <h1 className="app">Hello, React with TypeScript!</h1>;
};

export default App