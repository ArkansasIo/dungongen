import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import TabletopBoot from './ui/TabletopBoot';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TabletopBoot><App /></TabletopBoot>
  </React.StrictMode>
);
