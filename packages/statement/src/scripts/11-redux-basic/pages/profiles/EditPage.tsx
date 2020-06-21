import { Actions } from '../../stores/Profile';
import { Dispatch } from 'redux';
import { RootState } from '../../stores/store';
import { css } from 'emotion';
import { useDispatch, useSelector } from 'react-redux';
import React, { ChangeEvent, useState } from 'react';

export const ProfileEditPage = () => {
  const { name } = useSelector(({ profile }: RootState) => ({ name: profile.name }));

  const dispatch = useDispatch<Dispatch<Actions>>();

  const [input, setInput] = useState('');

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setInput(value);

  const handleSubmit = () => {
    dispatch({
      type: 'Profile.Updates.Name',
      payload: {
        name: input,
      },
    });

    setInput('');
  };

  return (
    <>
      <h2>Edit Profile</h2>
      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend>name</legend>
          <input onChange={handleChange} value={input} />
        </fieldset>
        <div className={controlsStyle}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
      <hr />
      <p>name: {name}</p>
    </>
  );
};

const controlsStyle = css({
  marginTop: 16,
});
