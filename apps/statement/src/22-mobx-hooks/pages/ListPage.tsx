import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useState, type ChangeEvent } from 'react';
import { ListStore } from '../stores/ListStore';

export const ListPage = () => {
  console.info('list page');

  const [store] = useState(() => new ListStore());

  return (
    <ListStore.Context.Provider value={store}>
      <div className={styleBase}>
        <h1>MobX</h1>
        <AddForm />
        <EditForm />
        <ShowSection />
      </div>
    </ListStore.Context.Provider>
  );
};

const styleBase = css`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  padding: ${gutter(4)};
`;

const AddForm = () => {
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

const EditForm = () => {
  console.info('edit form');

  const listStore = ListStore.useStore();

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
    listStore.editItem({ name, age }, index);
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
        <button onClick={handleSubmit}>Add</button>
      </fieldset>
    </form>
  );
};

const ShowSection = observer(() => {
  console.info('show section');

  const listStore = ListStore.useStore();

  return (
    <>
      <h2>List Items</h2>
      <ul>
        {toJS(listStore.items).map(({ name, age }, index) => (
          <li key={index}>
            {name} ({age})
          </li>
        ))}
      </ul>
    </>
  );
});
