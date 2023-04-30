import { createContainer } from '@learn-react/core/src/helpers/Container';
import { Component, Suspense, useState, type ReactNode } from 'react';
import { fetchUser } from './api';
import { Loader } from './components/Loader';

function useHook() {
  const [userId, setUserId] = useState(1);

  const resource = fetchUser(userId);

  return {
    resource,
    update: setUserId,
  };
}

const Container = createContainer(useHook);

type Props = {
  children: ReactNode;
};

const Provider = ({ children }: Props) => (
  <ErrorBoundary fallback={<p>エラーが発生しました</p>}>
    <Container.Provider>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </Container.Provider>
  </ErrorBoundary>
);

export const UserContainer = {
  Provider,
  useHook: Container.useContainer,
} as const;

type ErrorProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type ErrorState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  public render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return fallback;
    }
    return children;
  }
}
