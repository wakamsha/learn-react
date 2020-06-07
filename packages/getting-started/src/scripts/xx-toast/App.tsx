import { AddMessage } from './components/AddMessage';
import { ToastProvider } from './components/Toast';
import React from 'react';

export const ToastApp = (): JSX.Element => (
  <ToastProvider>
    <h1>Snackbar App</h1>
    <AddMessage />
  </ToastProvider>
);
