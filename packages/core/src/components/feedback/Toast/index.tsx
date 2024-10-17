/**
 * Constate を使った実装。
 */
import { css, cx } from '@emotion/css';
import { type IconName } from '@learn-react/icon';
import constate from 'constate';
import { useCallback, useEffect, useState, type AnimationEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Duration, Easing, FontSize, IconSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';

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

  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(({ message, icon, theme }: Pick<Toast, 'message' | 'icon' | 'theme'>) => {
    setQueue((toasts) => [...toasts, { id: Date.now(), message, icon, theme }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setQueue((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length <= limit) {
      setToasts(queue.slice(0, limit));
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

const Container = () => {
  const toasts = useToasts();

  return createPortal(
    <aside className={styleContainerBase}>
      {toasts.map(({ id, message, icon, theme }) => (
        <Item key={id} id={id} icon={icon} theme={theme}>
          {message}
        </Item>
      ))}
    </aside>,
    document.querySelector('#app') ?? document.body,
  );
};

const styleContainerBase = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: ${gutter(4)};

  > :not(:first-child) {
    margin-bottom: ${gutter(4)};
  }
`;

type ItemProps = {
  children: ReactNode;
} & Pick<Toast, 'id' | 'icon' | 'theme'>;

/**
 * 指定のメッセージをトースト UI として表示します。
 * トーストは親である `Container` 内に表示します。
 */
const Item = ({ children, id, icon, theme = 'primary' }: ItemProps) => {
  const removeToast = useRemoveToast();

  const [styleAddon, setStyleAddon] = useState('');

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (window.getComputedStyle(event.currentTarget).opacity === '0') {
      removeToast(id);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStyleAddon(styleRemove);
    }, hideDurationTime);

    return () => {
      window.clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <div className={`${styleItemBase} ${Theme[theme]} ${styleAddon}`} onAnimationEnd={handleAnimationEnd}>
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
    </div>
  );
};

const hideDurationTime = 5000;

const styleItemBase = css`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 256px;
  max-width: 30vw;
  padding: ${gutter(4)} ${gutter(5)} ${gutter(4)} ${gutter(4)};
  font-size: ${FontSize.Regular};
  color: white;
  box-shadow: ${cssVar('ShadowNeutral')};
  animation: base-animation ${Duration.Enter} ${Easing.Enter};

  @keyframes base-animation {
    from {
      opacity: 0;
      transform: translate3d(-10%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  > :not(:first-child) {
    margin-left: ${gutter(1)};
  }

  > svg {
    flex: 0 0 auto;
    fill: white;
    ${square(IconSize.Large)}
  }
`;

const styleRemove = cx(
  styleItemBase,
  css`
    opacity: 0;
    animation: remove-animation ${Duration.Leave} ${Easing.Leave};

    @keyframes remove-animation {
      from {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      to {
        opacity: 0;
        transform: translate3d(-40%, 0, 0);
      }
    }
  `,
);

const Theme = {
  primary: css`
    background-color: ${cssVar('ThemePrimaryNeutral')};
  `,
  danger: css`
    background-color: ${cssVar('ThemeDangerNeutral')};
  `,
} as const;

export { ToastProvider, useAddToast, useRemoveToast };
