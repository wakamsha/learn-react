import { makeAutoObservable } from 'mobx';

type Item = {
  name: string;
  age: number;
};

export class ListStore {
  public items: Item[] = [
    {
      name: 'taro',
      age: 10,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  public addItem(item: Item) {
    this.items.push(item);
  }

  public editItem(item: Item, index: number) {
    this.items.splice(index, 1, item);
  }

  public resetItem() {
    this.items = [];
  }
}
