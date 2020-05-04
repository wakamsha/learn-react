import * as React from 'react';
import { Location } from 'history';
import { Prompt } from 'react-router';

export const Form = () => {
  const [blocking, setState] = React.useState(false);

  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();
    setState(false);
  }, []);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setState(!!e.target.value.length),
    [],
  );

  const handleMessage = React.useCallback(
    (location: Location) => `このページを離れて ${window.location.pathname} へ移動しますか？`,
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
