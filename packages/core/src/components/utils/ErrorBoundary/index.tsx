import { Component, type ComponentType, type ReactNode } from 'react';

/**
 * フォールバックとしてレンダリングするコンポーネントに持たせるプロパティの型です。
 */
export type FallbackProps<ERROR extends Record<string, unknown>> = {
  /**
   * キャッチしたエラーの詳細。
   */
  error: ERROR;
  /**
   * 状態をリセットしたときに呼び出す関数。
   */
  onReset?: () => void;
};

type Props<ERROR extends Record<string, unknown>> = {
  onReset?: () => void;
  children: ReactNode;
  fallbackComponent: ComponentType<FallbackProps<ERROR>>;
};

type State<ERROR extends Record<string, unknown>> = {
  error?: ERROR;
};

/**
 * throw されたエラーオブジェクトをキャッチします。
 */
export class ErrorBoundary<ERROR extends Record<string, unknown>> extends Component<Props<ERROR>, State<ERROR>> {
  constructor(props: Props<ERROR>) {
    super(props);
    this.state = {};
  }

  /**
   * なにもせずエラーオブジェクトを返すだけ。
   * Lint エラー回避のために実装しています。
   *
   * @param error - スローされたエラーオブジェクト
   */
  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  /**
   * キャッチしたエラーをリリースして状態をリセットします。
   */
  #reset() {
    const { onReset } = this.props;
    onReset?.();

    this.setState({ error: undefined });
  }

  /**
   * エラーをキャッチしたら `FallbackComponent` をレンダリングします。
   */
  render() {
    const { children, fallbackComponent: FallbackComponent } = this.props;
    const { error } = this.state;

    return error ? (
      <FallbackComponent
        error={error}
        onReset={() => {
          this.#reset();
        }}
      />
    ) : (
      children
    );
  }
}
