import { useCallback, useState } from 'react';
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

  const addItem = useCallback((item: Item) => {
    setItems(items => [...items, item]);
  }, []);

  const editItem = useCallback((editedItem: Item, index: number) => {
    setItems(items => items.map((item, i) => (i === index ? editedItem : item)));
  }, []);

  return { items, addItem, editItem };
};

export const ListContainer = createContainer(useList);
