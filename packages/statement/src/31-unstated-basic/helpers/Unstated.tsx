import { useContext } from '@learn-react/core/hooks/useContext';
import type { ComponentType, ReactNode } from 'react';
import { createContext } from 'react';

type ContainerProviderProps<S = void> = {
  initialState?: S;
  children: ReactNode;
};

type Container<V, S = void> = {
  Provider: ComponentType<ContainerProviderProps<S>>;
  useContainer: () => V;
};

export function createContainer<V, S = void>(useHook: (initialState?: S) => V): Container<V, S> {
  const Context = createContext<V | null>(null);

  const Provider = ({ initialState, children }: ContainerProviderProps<S>) => {
    const value = useHook(initialState);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContainer = (): V => {
    const value = useContext(Context);

    return value;
  };

  return { Provider, useContainer };
}
