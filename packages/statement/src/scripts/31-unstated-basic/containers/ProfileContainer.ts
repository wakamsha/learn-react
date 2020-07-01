import { createContainer } from '../helpers/Unstated';
import { useState } from 'react';

const useProfile = () => {
  const [name, setName] = useState('');

  return { name, setName };
};

export const ProfileContainer = createContainer(useProfile);
