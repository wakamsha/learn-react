import { type ChangeEvent } from 'react';
import { useNotepad, useUpdateNotepad } from '../states/NotepadState';

type NoteType = ReturnType<typeof useNotepad>['notes'][number];

type Props = {
  readonly item: NoteType;
};

export const NoteItem = ({ item }: Props) => {
  console.info('NoteItem');

  const { notes } = useNotepad();

  const { update } = useUpdateNotepad();

  const index = notes.findIndex((note) => note === item);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    update(
      {
        type: 'value',
        payload: e.target.value,
      },
      index,
    );
  };

  const handleToggleComplete = () => {
    update(
      {
        type: 'isComplete',
        payload: !notes[index].isComplete,
      },
      index,
    );
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
