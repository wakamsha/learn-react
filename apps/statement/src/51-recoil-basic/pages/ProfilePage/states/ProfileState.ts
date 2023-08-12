import { atom, useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil';

type ProfileType = {
  name: string;
};

export function useProfile() {
  return {
    profile: useRecoilValue(profileState),
  };
}

export function useUpdateProfile() {
  return {
    edit: useRecoilCallback(
      ({ set }) =>
        (name: string) =>
          set(profileState, () => ({ name })),
    ),
    reset: useResetRecoilState(profileState),
  };
}

const profileState = atom<ProfileType>({
  key: 'profile/state',
  default: {
    name: '',
  },
});
