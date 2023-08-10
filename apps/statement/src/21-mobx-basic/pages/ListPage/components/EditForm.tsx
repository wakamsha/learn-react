import { useState, type ChangeEvent } from 'react';
import { type ListStore } from '../stores/ListStore';

type Props = {
  listStore: ListStore;
};

export const EditForm = ({ listStore }: Props) => {
  const [name, setName] = useState('');

  const [age, setAge] = useState(20);

  const [index, setIndex] = useState(0);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(value));
  };

  const handleInputIndex = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(value));
  };

  const handleSubmit = () => {
    listStore.editItem({ name, age }, index);
    setName('');
    setAge(20);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Edit</legend>
        <p>
          <label>index:</label>
          <input type="number" value={index} onChange={handleInputIndex} />
        </p>
        <p>
          <label>name:</label>
          <input value={name} onChange={handleInputName} />
        </p>
        <p>
          <label>age:</label>
          <input type="number" value={age} onChange={handleInputAge} />
        </p>
        <button onClick={handleSubmit}>Add</button>
      </fieldset>
    </form>
  );
};
