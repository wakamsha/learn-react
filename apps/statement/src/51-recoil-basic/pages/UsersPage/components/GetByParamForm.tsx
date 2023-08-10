import { type ChangeEvent } from 'react';
import { useUser } from '../states/UsersState';

export const GetByParamForm = () => {
  console.info('Get By Param Form');

  // const [userId, setUserId] = useState(0);
  const { userId, setUserId } = useUser();

  const handleChangeId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(value));
  };

  // const handleSubmit = () => {
  //   console.info(userId);
  // };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3>Get by Params</h3>
      <p>取得する User の id を指定</p>
      <input type="number" max={100} value={userId} onChange={handleChangeId} />
      {/* <p>
        ID: <code>{0}</code>
      </p> */}
      {/* <button onClick={handleSubmit}>GET</button> */}
    </form>
  );
};
