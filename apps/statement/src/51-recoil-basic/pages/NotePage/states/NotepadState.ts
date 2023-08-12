import { atom, selector, useRecoilCallback, useRecoilValue, type UnwrapRecoilValue } from 'recoil';

type NoteType = {
  /** ID値 */
  id: string;
  /** ノートの内容 */
  value: string;
  /** 完了済みかどうか */
  isComplete: boolean;
};

type NotepadReturns = {
  /** メモ帳リストデータ */
  notes: UnwrapRecoilValue<typeof notepadState>;
  /** メモ帳リストの統計情報 */
  stats: UnwrapRecoilValue<typeof stats>;
};

export function useNotepad(): NotepadReturns {
  return {
    notes: useRecoilValue(notepadState),
    stats: useRecoilValue(stats),
  };
}

type Action =
  | {
      type: 'value';
      payload: string;
    }
  | {
      type: 'isComplete';
      payload: boolean;
    };

type UpdateNotepadReturns = {
  /**
   * メモを新しく作成する
   */
  add: () => void;
  /**
   * 指定のメモを更新する。
   *
   * @param action - 更新アクション
   *
   * @param index - 更新するメモのインデックス
   */
  update: (action: Action, index: number) => void;
};

export function useUpdateNotepad(): UpdateNotepadReturns {
  return {
    add: useRecoilCallback(
      ({ set }) =>
        () =>
          set(notepadState, (state) =>
            [
              ...state,
              {
                id: `${state.length + 1}`,
                value: '',
                isComplete: false,
              },
            ].sort((a, b) => a.id.localeCompare(b.id)),
          ),
    ),
    update: useRecoilCallback(
      ({ set }) =>
        ({ type, payload }: Action, index: number) =>
          set(notepadState, (state) =>
            state.map((note, i) =>
              i === index
                ? {
                    ...note,
                    [type]: payload,
                  }
                : note,
            ),
          ),
    ),
  };
}

const notepadState = atom<NoteType[]>({
  key: 'notepad/state',
  default: [
    {
      id: '1',
      value: '',
      isComplete: false,
    },
    {
      id: '2',
      value: '',
      isComplete: false,
    },
  ],
});

const stats = selector({
  key: 'notepad/stats',
  get: ({ get }) => {
    const notepadList = get(notepadState);

    const totalNum = notepadList.length;
    const totalCompletedNum = notepadList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
