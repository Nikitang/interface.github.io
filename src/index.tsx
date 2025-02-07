import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);
