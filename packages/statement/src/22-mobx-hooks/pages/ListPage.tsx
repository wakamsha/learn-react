import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { ListStore } from '../stores/ListStore';

export const ListPage = () => {
  console.info('list page');

  const listStore = useRef(new ListStore());

  return (
    <ListStore.Context.Provider value={listStore.current}>
      <h1>MobX</h1>
      <div className={styleBase}>
        <div className={styleColumn}>
          <AddForm />
          <EditForm />
        </div>
        <div className={styleColumn}>
          <ShowSection />
        </div>
      </div>
    </ListStore.Context.Provider>
  );
};

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
    <form onSubmit={e => e.preventDefault()}>
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
    <form onSubmit={e => e.preventDefault()}>
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
      <h3>List Items</h3>
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

const styleBase = css`
  display: flex;

  > :not(:first-child) {
    margin-left: ${gutter(4)};
  }
`;

const styleColumn = css`
  flex: 1 1 100%;
`;
