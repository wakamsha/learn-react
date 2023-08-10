import { type ChangeEvent } from 'react';
import { useRecoilState, type UnwrapRecoilValue } from 'recoil';
import { notepadState } from '../states/notepadState';

type NoteType = UnwrapRecoilValue<typeof notepadState>[number];

type Props = {
  readonly item: NoteType;
};

export const NoteItem = ({ item }: Props) => {
  const [notes, setNotes] = useRecoilState(notepadState);

  const index = notes.findIndex((listItem) => listItem === item);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const newList = notes.map<NoteType>((note, i) =>
      i === index
        ? {
            ...note,
            value: e.target.value,
          }
        : note,
    );

    setNotes(newList);
  };

  const handleToggleComplete = () => {
    const newList = notes.map<NoteType>((note, i) =>
      i === index
        ? {
            ...note,
            isComplete: !note.isComplete,
          }
        : note,
    );

    setNotes(newList);
  };

  return (
    <div>
      <div>ノート #{item.id}</div>
      <input value={item.value} placeholder="メモを入力しましょう！" onChange={handleChangeText} />

      <label>
        <input type="checkbox" checked={item.isComplete} onChange={handleToggleComplete} />
        完了
      </label>
    </div>
  );
};
