import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import MainProvider from './context/MainProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <MainProvider>
        <App />
      </MainProvider>
    </React.StrictMode>
  </BrowserRouter>
);
