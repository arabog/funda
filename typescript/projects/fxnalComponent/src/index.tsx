import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App confirmOpen={false} confrimCancel={false} handleOkClick={function (): void {
      throw new Error('Function not implemented.');
    } } handleOkCancel={function (): void {
      throw new Error('Function not implemented.');
    } } />
  </React.StrictMode>
);


reportWebVitals();
