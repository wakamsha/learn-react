import { css } from 'emotion';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from '../stores/List';
import { RootState } from '../stores/store';

export const ListPage = () => (
  <div className={baseStyle}>
    <div className={columnStyle}>
      <AddForm />
      <EditForm />
    </div>
    <ShowSection />
  </div>
);

const AddForm = () => {
  const dispatch = useDispatch<Dispatch<Actions>>();

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setAge(Number(value));

  const handleSubmit = () => {
    dispatch({
      type: 'List.Add',
      payload: {
        item: {
          name,
          age,
        },
      },
    });
    setName('');
    setAge(18);
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
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

const EditForm = () => {
  const dispatch = useDispatch<Dispatch<Actions>>();

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const [index, setIndex] = useState(0);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setAge(Number(value));

  const handleInputIndex = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setIndex(Number(value));

  const handleSubmit = () => {
    dispatch({
      type: 'List.Update',
      payload: {
        index,
        item: {
          name,
          age,
        },
      },
    });
    setName('');
    setAge(18);
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
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
        <button onClick={handleSubmit}>Update</button>
      </fieldset>
    </form>
  );
};

const ShowSection = () => {
  const { items } = useSelector(({ list }: RootState) => ({ items: list.items }));

  return (
    <div className={columnStyle}>
      <h2>List Items</h2>
      <ul>
        {items.map(({ name, age }, index) => (
          <li key={index}>
            {name} ({age})
          </li>
        ))}
      </ul>
    </div>
  );
};

const baseStyle = css({
  display: 'flex',
});

const columnStyle = css({
  flex: '1 1 100%',
  '& + &': {
    marginLeft: 16,
  },
});
