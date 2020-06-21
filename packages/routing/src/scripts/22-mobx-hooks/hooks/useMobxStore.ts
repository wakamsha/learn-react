import { Context } from 'react';
import { useContext } from '../../@core/hooks/useContext';
import { useObserver } from 'mobx-react';

export type Selector<Store, Selection> = (store: Store) => Selection;

export function useMobxStore<Store, Selection>(context: Context<Store | null>, selector: Selector<Store, Selection>) {
  const store = useContext(context);

  return useObserver(() => selector(store));
}
