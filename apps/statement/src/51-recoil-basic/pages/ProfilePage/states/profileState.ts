import { atom } from 'recoil';

type ProfileType = {
  name: string;
};

export const profileState = atom<ProfileType>({
  key: 'profileState',
  default: {
    name: '',
  },
});
