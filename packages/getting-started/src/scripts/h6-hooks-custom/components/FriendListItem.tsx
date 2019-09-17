import * as React from 'react';
import { useFriendStatus } from '../hooks/FriendStatus';

type Props = {
  friend: {
    id: number;
    name: string;
  };
};

export const FriendListItem = ({ friend }: Props) => {
  // const [online, setOnline] = React.useState<boolean | null>(null);

  // React.useEffect(() => {
  //   const handleChangeStatus = (status: any) => setOnline(status.online);
  //   ChatAPI.subscribeToFriendStatus(friend.id, handleChangeStatus);
  //   return () => ChatAPI.unsubscribeFromFriendStatus(friend.id, handleChangeStatus);
  // });
  const online = useFriendStatus(friend.id);

  return <li style={{ color: online ? 'green' : 'gray' }}>{friend.name}</li>;
};
