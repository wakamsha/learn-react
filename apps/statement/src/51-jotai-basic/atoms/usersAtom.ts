import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { requestGetUser, requestGetUsers, requestPostUser } from '../infra/client';
import { type User } from '../infra/model';

function createUsersAtoms(initialItems: User[]) {
  const usersAtom = atom(initialItems);

  const getAllUsersAtom = atom(null, async (_, set) => {
    const users = await requestGetUsers();
    set(usersAtom, users);
  });

  const getUserAtom = atom(null, async (_, set, userId: number) => {
    const user = await requestGetUser({ path: userId ? `${userId}` : '' });
    set(usersAtom, [user]);
  });

  const postUserAtom = atom(null, async (_, set, { name, job }: { name: string; job: string }) => {
    const response = await requestPostUser({ send: { name, job } });
    set(usersAtom, (previous) => [...previous, response]);
  });

  const loadableUsersAtom = loadable(getAllUsersAtom);

  return { usersAtom, getAllUsersAtom, getUserAtom, postUserAtom, loadableUsersAtom };
}

const { usersAtom, getAllUsersAtom, getUserAtom, postUserAtom, loadableUsersAtom } = createUsersAtoms([]);

export { getAllUsersAtom, getUserAtom, loadableUsersAtom, postUserAtom, usersAtom };
