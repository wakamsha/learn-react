import { useContext } from '@learn-react/core/hooks/useContext';
import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

type Item = {
  name: string;
  age: number;
};

export class ListStore {
  public static Context = createContext<ListStore | null>(null);

  public static useStore() {
    return useContext(ListStore.Context);
  }

  public items: Item[] = [
    {
      name: 'taro',
      age: 10,
    },
  ];

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action,
      editItem: action,
    });
  }

  public addItem(item: Item) {
    this.items.push(item);
  }

  public editItem(item: Item, index: number) {
    this.items.splice(index, 1, item);
  }
}
