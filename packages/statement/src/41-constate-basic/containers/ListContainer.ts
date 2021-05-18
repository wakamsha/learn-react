import constate from 'constate';
import { useCallback, useState } from 'react';

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

const [ListProvider, useListItems, useAddListItem, useEditListItem] = constate(
  useList,
  hook => hook.items,
  hook => hook.addItem,
  hook => hook.editItem,
);

export { ListProvider, useListItems, useAddListItem, useEditListItem };
