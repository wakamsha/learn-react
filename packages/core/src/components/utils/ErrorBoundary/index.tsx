import { Component, type ComponentType, type ReactNode } from 'react';

export type FallbackProps<ERROR extends Record<string, unknown>> = {
  error: ERROR;
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

export class ErrorBoundary<ERROR extends Record<string, unknown>> extends Component<Props<ERROR>, State<ERROR>> {
  constructor(props: Props<ERROR>) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  #reset() {
    const { onReset } = this.props;
    onReset?.();

    this.setState({ error: undefined });
  }

  render() {
    const { children, fallbackComponent: FallbackComponent } = this.props;
    const { error } = this.state;

    return error ? <FallbackComponent error={error} onReset={() => this.#reset()} /> : children;
  }
}
