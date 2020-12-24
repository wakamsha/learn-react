import { useState } from 'react';
import { createContainer } from '../helpers/Unstated';

type Item = {
  name: string;
  age: number;
};

const useList = () => {
  const [items, setItems] = useState<Item[]>([
    {
      name: 'taro',
      age: 10,
    },
  ]);

  const addItem = (item: Item) => setItems(items => [...items, item]);

  const editItem = (editedItem: Item, index: number) =>
    setItems(items => items.map((item, i) => (i === index ? editedItem : item)));

  const resetItem = () => setItems([]);

  return { items, addItem, editItem, resetItem };
};

export const ListContainer = createContainer(useList);
