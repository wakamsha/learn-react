import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { createStore, Provider, useAtomValue, useSetAtom } from 'jotai';
import { type ChangeEvent, useState } from 'react';
import { addItemAtom, countAtom, editItemAtom, itemsAtom } from '../atoms/listAtoms';

export const ListPage = () => {
  const store = createStore();

  store.set(itemsAtom, [
    {
      name: 'john',
      age: 10,
    },
  ]);

  return (
    <>
      <h1>Jotai</h1>
      <Provider store={store}>
        <div className={styleBase}>
          <div className={styleColumn}>
            <AddForm />
            <EditForm />
          </div>
          <div className={styleColumn}>
            <ShowSection />
          </div>
        </div>
      </Provider>
    </>
  );
};

const AddForm = () => {
  console.info('add form');

  const addItem = useSetAtom(addItemAtom);

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(value));
  };

  const handleSubmit = () => {
    addItem({ name, age });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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

  const editItem = useSetAtom(editItemAtom);

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
    editItem({ editedItem: { name, age }, index });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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

const ShowSection = () => {
  console.info('show section');

  const items = useAtomValue(itemsAtom);

  const count = useAtomValue(countAtom);

  return (
    <>
      <h3>List Items</h3>
      <ul>
        {items.map(({ name, age }, index) => (
          <li key={index}>
            {name}
            <em>({age})</em>
          </li>
        ))}
      </ul>
      <div>{count}</div>
    </>
  );
};

const styleBase = css`
  display: flex;

  > :not(:first-child) {
    margin-left: ${gutter(4)};
  }
`;

const styleColumn = css`
  flex: 1 1 100%;
`;
