import constate from 'constate';
import { useState } from 'react';

const useProfile = () => {
  const [name, setName] = useState('');

  return { name, setName };
};

const [ProfileContainer, useName, useEditName] = constate(
  useProfile,
  hook => hook.name,
  hook => hook.setName,
);

export { ProfileContainer, useName, useEditName };
