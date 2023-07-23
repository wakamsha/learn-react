/**
 * Constate を使った実装。
 */
import { type IconName } from '@learn-react/icon';
import constate from 'constate';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Container } from './Container';

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

const useToast = ({ limit = 1 }) => {
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

  return { toasts, addToast, removeToast };
};

const [Provider, useToasts, useAddToast, useRemoveToast] = constate(
  useToast,
  (hook) => hook.toasts,
  (hook) => hook.addToast,
  (hook) => hook.removeToast,
);

/**
 * トーストの状態を管理します。
 */
const ToastProvider = ({ children, limit = 1 }: ProviderProps) => (
  <Provider limit={limit}>
    {children}
    <Container />
  </Provider>
);

export { ToastProvider, useAddToast, useRemoveToast, useToasts };
