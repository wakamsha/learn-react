import { atom, useRecoilCallback, useRecoilValue, type UnwrapRecoilValue } from 'recoil';

type Item = {
  name: string;
  age: number;
};

type ListReturns = {
  /** リストデータ */
  list: UnwrapRecoilValue<typeof listState>;
};

export function useList(): ListReturns {
  return {
    list: useRecoilValue(listState),
  };
}

type UpdateListReturns = {
  /**
   * アイテムを新しく追加する。
   *
   * @param payload - 追加するアイテム。
   */
  add: (payload: Item) => void;
  /**
   * 指定のアイテムを更新する。
   *
   * @param payload - 更新する名前
   *
   * @param index - 更新するアイテムのインデックス
   */
  edit: (payload: string, index: number) => void;
};

export function useUpdateList(): UpdateListReturns {
  return {
    add: useRecoilCallback(
      ({ set }) =>
        (payload: Item) =>
          set(listState, (state) => [...state, payload]),
    ),
    edit: useRecoilCallback(
      ({ set }) =>
        (payload: Item['name'], index: number) =>
          set(listState, (state) =>
            state.map((item, i) =>
              i === index
                ? {
                    ...item,
                    name: payload,
                  }
                : item,
            ),
          ),
    ),
  };
}

const listState = atom<Item[]>({
  key: 'list/state',
  default: [
    {
      name: 'taro',
      age: 10,
    },
  ],
});
