import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FromProvider from './context/formContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<FromProvider>
    <App/>
  </FromProvider>
  
);

