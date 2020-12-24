import { Location } from 'history';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Prompt } from 'react-router';

export const Form = () => {
  const [blocking, setState] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();
    setState(false);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setState(!!e.target.value.length), []);

  const handleMessage = useCallback(
    (location: Location) => `このページを離れて ${location.pathname} へ移動しますか？`,
    [],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Prompt when={blocking} message={handleMessage} />
      <p>Blocking? {blocking ? 'Yes, click a link or the back button' : 'Nope'}</p>
      <p>
        <input placeholder="Type something to block transitions..." onChange={handleChange} />
      </p>
      <button>SUBMIT</button>
    </form>
  );
};
