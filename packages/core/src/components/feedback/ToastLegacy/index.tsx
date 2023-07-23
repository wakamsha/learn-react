/**
 * Unstated Next も Constate も使わない最もプリミティブな実装。
 */
import { type IconName } from '@learn-react/icon';
import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { useContext } from '../../../hooks/useContext';
import { Container } from './Container';

type Context = {
  addToast: ({ message, icon, theme }: Pick<Toast, 'message' | 'icon' | 'theme'>) => void;
  removeToast: (id: number) => void;
};

const Context = createContext<Context | null>(null);

type ProviderProps = {
  children: ReactNode;
  /**
   * 一度に表示する通知の上限数。
   *
   * @default 1
   */
  limit?: number;
};

type Theme = 'primary' | 'danger';

/**
 * トーストアイテムの詳細。
 */
export type Toast = {
  /**
   * トーストアイテムを識別するためのユニークな値。
   */
  id: number;
  /**
   * 表示するメッセージ。
   */
  message: string;
  /**
   * トーストに表示するアイコンの名前。
   */
  icon?: IconName;
  /**
   * トーストのカラーテーマ。
   */
  theme?: Theme;
};

const Provider = ({ children, limit = 1 }: ProviderProps) => {
  const [queue, setQueue] = useState<Toast[]>([]);

  const [toasts, SetToasts] = useState<Toast[]>([]);

  const addToast = useCallback(({ message, icon, theme }: Pick<Toast, 'message' | 'icon' | 'theme'>) => {
    setQueue((toasts) => [...toasts, { id: Date.now(), message, icon, theme }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setQueue((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length <= limit) {
      SetToasts(queue.slice(0, limit));
    }
  }, [limit, toasts.length, queue]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ addToast, removeToast }}>
      {children}
      <Container toasts={toasts} />
    </Context.Provider>
  );
};

const useToast = (): Context => useContext(Context);

export const Toast = {
  Provider,
  useToast,
} as const;
