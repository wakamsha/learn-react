import { atom } from 'recoil';

type Item = {
  name: string;
  age: number;
};

export const listState = atom<Item[]>({
  key: 'listState',
  default: [
    {
      name: 'taro',
      age: 10,
    },
  ],
});
