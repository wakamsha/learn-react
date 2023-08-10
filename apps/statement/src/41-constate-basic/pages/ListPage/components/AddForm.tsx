import { useState, type ChangeEvent } from 'react';
import { useAddListItem } from '../containers/ListContainer';

export const AddForm = () => {
  console.info('add form');

  const addItem = useAddListItem();

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleInputAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.currentTarget.value));
  };

  const handleSubmit = () => {
    addItem({ name, age });
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
