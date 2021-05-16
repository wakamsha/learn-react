import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import { observer } from 'mobx-react';
import { ChangeEvent, createContext, useMemo, useState } from 'react';
import { ListStore } from '../stores/ListStore';

export const ListPage = () => {
  const store = useMemo(() => new ListStore(), []);

  const Context = useMemo(() => createContext(store), [store]);

  return (
    <Context.Provider value={store}>
      <div className={styleBase}>
        <Context.Consumer>
          {store => (
            <>
              <div className={styleColumn}>
                <AddForm listStore={store} />
                <EditForm listStore={store} />
              </div>
              <div className={styleColumn}>
                <ShowSection listStore={store} />
              </div>
            </>
          )}
        </Context.Consumer>
      </div>
    </Context.Provider>
  );
};

const AddForm = ({ listStore }: { listStore: ListStore }) => {
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

const EditForm = ({ listStore }: { listStore: ListStore }) => {
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

const ShowSection = observer(({ listStore }: { listStore: ListStore }) => (
  <>
    <h3>List Items</h3>
    <ul>
      {listStore.items.map(({ name, age }, index) => (
        <li key={index}>
          {name} ({age})
        </li>
      ))}
    </ul>
  </>
));

const styleBase = css`
  display: flex;
  padding: ${gutter(4)};

  > :not(:first-child) {
    margin-left: ${gutter(4)};
  }
`;

const styleColumn = css`
  flex: 1 1 100%;
`;
