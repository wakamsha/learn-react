import { Container } from './Container';
import { useContext } from '../../hooks/useContext';
import React, { ReactNode, createContext, useCallback, useState } from 'react';

const Context = createContext<Context | null>(null);

type Context = { addToast: (content: string) => void; removeToast: (id: number) => void };

type ProviderProps = {
  children: ReactNode;
};

export type Toast = {
  id: number;
  content: string;
};

export const ToastProvider = ({ children }: ProviderProps): JSX.Element => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((content: string) => setToasts(toasts => [...toasts, { id: Date.now(), content }]), []);

  const removeToast = useCallback((id: number) => setToasts(toasts => toasts.filter(toast => toast.id !== id)), []);

  return (
    <Context.Provider value={{ addToast, removeToast }}>
      {children}
      <Container toasts={toasts} />
    </Context.Provider>
  );
};

export const useToast = (): Context => useContext(Context);
