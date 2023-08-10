import { useState, type ChangeEvent } from 'react';
import { useEditListItem } from '../containers/ListContainer';

export const EditForm = () => {
  console.info('edit form');

  const editItem = useEditListItem();

  const [name, setName] = useState('');

  const [age, setAge] = useState(20);

  const [index, setIndex] = useState(0);

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleInputAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.currentTarget.value));
  };

  const handleInputIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(e.currentTarget.value));
  };

  const handleSubmit = () => {
    editItem({ name, age }, index);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Edit</legend>
        <p>
          <label>
            index:
            <input type="number" value={index} onChange={handleInputIndex} />
          </label>
        </p>
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
        <button onClick={handleSubmit}>Edit</button>
      </fieldset>
    </form>
  );
};
