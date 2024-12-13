import React, { startTransition } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './app/app';

import './index.css';
import { Preloader } from '@ui';
import { Outlet } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<Preloader />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
