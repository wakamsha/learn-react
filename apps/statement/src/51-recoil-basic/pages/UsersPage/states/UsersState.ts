import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { requestGetUser } from '../../../infra/client';

export function useUser() {
  const [state, setParam] = useRecoilState(param);

  return {
    userId: state.userId,
    setUserId: (userId: number) => {
      setParam({ userId });
    },
  };
}

export function useData() {
  return {
    data: useRecoilValue(myQuery),
  };
}

const param = atom({
  key: 'users/state',
  default: {
    userId: 1,
  },
});

const myQuery = selector({
  key: 'users/myQuery',
  get: async ({ get }) => {
    const { userId } = get(param);
    const response = await requestGetUser({
      path: userId ? `${userId}` : '',
    });

    return response;
  },
});
