import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useState, type ChangeEvent } from 'react';
import { ListContainer } from '../containers/ListContainer';

export const ListPage = () => {
  console.info('list page');

  return (
    <ListContainer.Provider>
      <h1>Unstated Next</h1>
      <div className={styleBase}>
        <div className={styleColumn}>
          <AddForm />
          <EditForm />
        </div>
        <div className={styleColumn}>
          <ShowSection />
        </div>
      </div>
    </ListContainer.Provider>
  );
};

const AddForm = () => {
  console.info('add form');

  const { addItem } = ListContainer.useContainer();

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleInputAge = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.currentTarget.value));
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
            name
            <input value={name} onChange={handleInputName} />
          </label>
        </p>
        <p>
          <label>
            age
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

  const { editItem } = ListContainer.useContainer();

  const [name, setName] = useState('');

  const [age, setAge] = useState(20);

  const [index, setIndex] = useState(0);

  const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleInputAge = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.currentTarget.value));
  };

  const handleInputIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(event.currentTarget.value));
  };

  const handleSubmit = () => {
    editItem({ name, age }, index);
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

  const { items } = ListContainer.useContainer();

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
