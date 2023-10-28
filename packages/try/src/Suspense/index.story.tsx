import { useState, type ChangeEvent } from 'react';
import { UserContainer } from './Container';

export const Story = () => (
  <>
    <h2>Suspense for Data Fetching</h2>
    <p>Suspense と Hooks を組み合わせたデータ取得デモ。</p>
    <hr />
    <UserContainer.Provider>
      <Presentation />
    </UserContainer.Provider>
  </>
);

const Presentation = () => {
  const { resource, update } = UserContainer.useHook();

  const { result, error } = resource.read();

  const [userId, setUserId] = useState(result.id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.target.value));
  };

  const handleSubmit = () => {
    update(userId);
  };

  if (error) {
    return <h1>Error!</h1>;
  }

  return (
    <>
      <h1>Hello {result.name}</h1>
      <pre>
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="number" value={userId} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};
