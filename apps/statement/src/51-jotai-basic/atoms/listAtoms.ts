import { atom } from 'jotai';

type Item = {
  name: string;
  age: number;
};

function createListAtoms(initialItems: Item[]) {
  const itemsAtom = atom(initialItems);

  const countAtom = atom((get) => get(itemsAtom).length);

  const addItemAtom = atom(null, (_, set, item: Item) => {
    set(itemsAtom, (items) => [...items, item]);
  });

  const editItemAtom = atom(null, (_, set, { editedItem, index }: { editedItem: Item; index: number }) => {
    set(itemsAtom, (items) => items.map((item, i) => (i === index ? editedItem : item)));
  });

  return { itemsAtom, addItemAtom, editItemAtom, countAtom };
}

const { itemsAtom, addItemAtom, editItemAtom, countAtom } = createListAtoms([
  {
    name: 'dummy',
    age: 10,
  },
]);

export { addItemAtom, countAtom, editItemAtom, itemsAtom };
