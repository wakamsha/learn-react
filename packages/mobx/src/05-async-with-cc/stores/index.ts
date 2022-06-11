import { UsersStore } from './UserStore';

const userStore = new UsersStore();

export const Stores = {
  userStore,
} as const;
