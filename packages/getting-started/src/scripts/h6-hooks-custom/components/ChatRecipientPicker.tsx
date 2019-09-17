import * as React from 'react';
import { useFriendStatus } from '../hooks/FriendStatus';

const friends = [
  {
    id: 1,
    name: 'Mick',
  },
  {
    id: 2,
    name: 'Keith',
  },
  {
    id: 3,
    name: 'Ronnie',
  },
  {
    id: 4,
    name: 'Charlie',
  },
];

export const ChatRecipientPicker = () => {
  const [recipientId, setRecipientId] = React.useState(1);
  const recipientOnline = useFriendStatus(recipientId);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setRecipientId(Number(e.target.value));

  return (
    <>
      <span style={{ background: recipientOnline ? 'green' : 'red' }} />
      <select value={recipientId} onChange={handleChange}>
        {friends.map(f => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>
    </>
  );
};
