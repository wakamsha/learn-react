import { useAtom } from 'jotai';
import { loadableUsersAtom } from '../../../atoms/usersAtom';

export const GetForm = () => {
  console.info('Get Form');

  // const { load, loadStatus } = useLoad();
  const [value] = useAtom(loadableUsersAtom);
  console.info('value', value);

  return (
    <div>
      <h3>Get</h3>
      {/* <button disabled={!!loadStatus.running} onClick={load}>
        GET ALL USERS
      </button> */}
    </div>
  );
};

// function useLoad() {
//   const [, getAllUsers] = useAtom(getAllUsersAtom);

//   const [load, loadStatus] = useTransaction(
//     useCallback(async () => {
//       await getAllUsers();
//     }, [getAllUsers]),
//   );

//   return { load, loadStatus };
// }
