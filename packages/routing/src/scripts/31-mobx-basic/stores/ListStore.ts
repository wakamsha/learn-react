import { action, observable } from 'mobx';

type Item = {
  name: string;
  age: number;
};

export class ListStore {
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
