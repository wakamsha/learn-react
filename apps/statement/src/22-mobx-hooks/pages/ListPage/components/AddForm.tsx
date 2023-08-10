import { useState, type ChangeEvent } from 'react';
import { ListStore } from '../stores/ListStore';

export const AddForm = () => {
  console.info('add form');

  const listStore = ListStore.useStore();

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleInputAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.currentTarget.value));
  };

  const handleSubmit = () => {
    listStore.addItem({ name, age });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Add</legend>
        <p>
          <label>
            name:
            <input value={name} onChange={handleInputName} />
          </label>
        </p>
        <p>
          <label>
            age:
            <input type="number" value={age} onChange={handleInputAge} />
          </label>
        </p>
        <button onClick={handleSubmit}>Add</button>
      </fieldset>
    </form>
  );
};
