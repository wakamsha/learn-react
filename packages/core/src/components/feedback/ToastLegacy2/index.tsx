/**
 * Unstated-Next を使った実装。
 */
import { type IconName } from '@learn-react/icon';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createContainer } from '../../../helpers/Container';
import { Container } from './Container';

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

function useToast(limit = 1) {
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
}

const ToastContainer = createContainer(useToast);

type Props = {
  children: ReactNode;
  limit?: number;
};

const Provider = ({ children, limit = 1 }: Props) => (
  <ToastContainer.Provider initialState={limit}>
    {children}
    <Container />
  </ToastContainer.Provider>
);

export const Toast = {
  Provider,
  useToast: ToastContainer.useContainer,
} as const;
