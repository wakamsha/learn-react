import { Actions } from '../../stores/Profile';
import { Dispatch } from 'redux';
import { RootState } from '../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export const ProfileShowPage = () => {
  const { name } = useSelector(({ profile }: RootState) => ({ name: profile.name }));

  const dispatch = useDispatch<Dispatch<Actions>>();

  const handleReset = () =>
    dispatch({
      type: 'Profile.Updates.Name',
      payload: {
        name: '',
      },
    });

  return (
    <>
      <h2>Show Profile</h2>
      <p>name: {name}</p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
