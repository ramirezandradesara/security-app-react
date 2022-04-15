// import React from 'react';
// import App from './App';
// import ReactDOM from 'react-dom';

// ReactDOM.render(
  //     <App />,
  //   document.getElementById('root')
  // );
  
// AFTER React 18

import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

