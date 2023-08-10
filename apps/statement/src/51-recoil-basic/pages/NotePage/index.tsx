import { css } from '@emotion/css';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { Log } from './components/Log';
import { NoteItem } from './components/NoteItem';
import { notepadState } from './states/notepadState';

/**
 * @see https://ics.media/entry/210224/
 */
export const NotePage = () => (
  <RecoilRoot>
    <Presentation />
  </RecoilRoot>
);

const Presentation = () => {
  // Recoilの Atoms を呼び出して定義
  const setNotepad = useSetRecoilState(notepadState);

  // ステートとして利用する
  const [notes] = useRecoilState(notepadState);

  /**
   * メモ帳を新しく作成します。
   */
  const handleCreate = () => {
    setNotepad((state) =>
      [
        ...state,
        {
          id: `${state.length + 1}`,
          value: '',
          isComplete: false,
        },
      ].sort((a, b) => a.id.localeCompare(b.id)),
    );
  };

  return (
    <div className={styleBase}>
      <div>
        <ul>
          {notes.map((note) => (
            <NoteItem key={note.id} item={note} />
          ))}
        </ul>
        <button onClick={handleCreate}>追加</button>
      </div>
      <Log />
    </div>
  );
};

const styleBase = css`
  display: grid;
  grid-template-columns: 60% 40%;
  height: 100dvh;
`;
