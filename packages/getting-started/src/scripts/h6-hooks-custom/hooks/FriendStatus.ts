import * as React from 'react';

export const useFriendStatus = (friendId: number) => {
  const [online, setOnline] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const handleChangeStatus = (status: any) => setOnline(status.online);
    ChatAPI.subscribeToFriendStatus(friendId, handleChangeStatus);
    return () => ChatAPI.unsubscribeFromFriendStatus(friendId, handleChangeStatus);
  });

  return online;
};
