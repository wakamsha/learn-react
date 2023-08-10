import { useState, type ChangeEvent } from 'react';
import { type ListStore } from '../stores/ListStore';

type Props = {
  listStore: ListStore;
};

export const AddForm = ({ listStore }: Props) => {
  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(value));
  };

  const handleSubmit = () => {
    listStore.addItem({ name, age });
    setName('');
    setAge(18);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Add</legend>
        <p>
          <label>name</label>
          <input value={name} onChange={handleInputName} />
        </p>
        <p>
          <label>age</label>
          <input type="number" value={age} onChange={handleInputAge} />
        </p>
        <button onClick={handleSubmit}>Add</button>
      </fieldset>
    </form>
  );
};
