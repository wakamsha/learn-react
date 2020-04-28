// import { Selector, useMobxStore } from '../hooks/useMobxStore';
import { action, observable } from 'mobx';
import { createContext } from 'react';

type Item = {
  name: string;
  age: number;
};

export class ListStore {
  public static Context = createContext<ListStore | null>(null);

  // public static useStore<S>(selector: Selector<ListStore, S>) {
  //   return useMobxStore(ListStore.Context, selector);
  // }

  @observable public items: Item[] = [
    {
      name: 'taro',
      age: 10,
    },
  ];

  @action
  public addItem(item: Item) {
    this.items.push(item);
  }

  @action
  public editItem(item: Item, index: number) {
    this.items.splice(index, 1, item);
  }

  @action
  public resetItem() {
    this.items = [];
  }
}
