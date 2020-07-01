import { useContext } from '../../@core/hooks/useContext';
import React, { ComponentType, ReactNode, createContext } from 'react';

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

  function Provider({ initialState, children }: ContainerProviderProps<S>) {
    const value = useHook(initialState);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContainer(): V {
    const value = useContext(Context);

    return value;
  }

  return { Provider, useContainer };
}
