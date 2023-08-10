import { atom } from 'recoil';

type NoteType = {
  /** ID値 */
  id: string;
  /** ノートの内容 */
  value: string;
  /** 完了済みかどうか */
  isComplete: boolean;
};

export const notepadState = atom<NoteType[]>({
  key: 'notepadState',
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
