import { ReactNode, createContext, useCallback, useState } from 'react';
import { useContext } from '../../hooks/useContext';
import { Container } from './Container';

type ProviderProps = {
  children: ReactNode;
};

type Theme = 'success' | 'danger';

export type Toast = {
  id: number;
  content: string;
  theme?: Theme;
};

export const ToastProvider = ({ children }: ProviderProps): JSX.Element => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    ({ content, theme }: { content: string; theme?: Theme }) =>
      setToasts(toasts => [...toasts, { id: Date.now(), content, theme }]),
    [],
  );

  const removeToast = useCallback((id: number) => setToasts(toasts => toasts.filter(toast => toast.id !== id)), []);

  return (
    <Context.Provider value={{ addToast, removeToast }}>
      {children}
      <Container toasts={toasts} />
    </Context.Provider>
  );
};

export const useToast = (): Context => useContext(Context);

const Context = createContext<Context | null>(null);

type Context = {
  addToast: ({ content, theme }: { content: string; theme?: Theme }) => void;
  removeToast: (id: number) => void;
};
