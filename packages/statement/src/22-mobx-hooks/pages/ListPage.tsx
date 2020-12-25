import { css } from '@emotion/css';
import { useContext } from '@learn-react/core/hooks/useContext';

import { toJS } from 'mobx';
import { ChangeEvent, useMemo, useState } from 'react';
import { ListStore } from '../stores/ListStore';

export const ListPage = () => {
  const listStore = useMemo(() => new ListStore(), []);

  return (
    <ListStore.Context.Provider value={listStore}>
      <div className={baseStyle}>
        <div className={columnStyle}>
          <AddForm />
          <EditForm />
        </div>
        <ShowSection />
      </div>
    </ListStore.Context.Provider>
  );
};

const AddForm = () => {
  const listStore = useContext(ListStore.Context);

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setAge(Number(value));

  const handleSubmit = () => {
    listStore.addItem({ name, age });
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
  const listStore = useContext(ListStore.Context);

  const [name, setName] = useState('');

  const [age, setAge] = useState(20);

  const [index, setIndex] = useState(0);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setAge(Number(value));

  const handleInputIndex = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setIndex(Number(value));

  const handleSubmit = () => {
    listStore.editItem({ name, age }, index);
    setName('');
    setAge(20);
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
        <button onClick={handleSubmit}>Add</button>
      </fieldset>
    </form>
  );
};

const ShowSection = () => {
  const listStore = useContext(ListStore.Context);

  const items = ListStore.useStore(() => toJS(listStore.items));

  return (
    <div className={columnStyle}>
      <h3>List Items</h3>
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
