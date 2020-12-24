import { gutter } from '@learn-react/core/helpers/Style';
import { css } from 'emotion';
import { ChangeEvent, useState } from 'react';
import { ListContainer } from '../../containers/ListContainer';

export const ListPage = () => (
  <ListContainer.Provider>
    <div className={baseStyle}>
      <div className={columnStyle}>
        <AddForm />
        <EditForm />
      </div>
      <ShowSection />
    </div>
  </ListContainer.Provider>
);

const AddForm = () => {
  const { addItem } = ListContainer.useContainer();

  const [name, setName] = useState('');

  const [age, setAge] = useState(18);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setAge(Number(value));

  const handleSubmit = () => {
    addItem({ name, age });
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
  const { editItem } = ListContainer.useContainer();

  const [name, setName] = useState('');

  const [age, setAge] = useState(20);

  const [index, setIndex] = useState(0);

  const handleInputName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setName(value);

  const handleInputAge = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setAge(Number(value));

  const handleInputIndex = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setIndex(Number(value));

  const handleSubmit = () => {
    editItem({ name, age }, index);
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
        <button onClick={handleSubmit}>Edit</button>
      </fieldset>
    </form>
  );
};

const ShowSection = () => {
  const { items } = ListContainer.useContainer();

  return (
    <div className={columnStyle}>
      <h3>List Items</h3>
      <ul>
        {items.map(({ name, age }, index) => (
          <li key={index}>
            {name}
            <em>({age})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

const baseStyle = css`
  display: flex;
  padding: ${gutter(4)};
`;

const columnStyle = css`
  flex: 1 1 100%;

  & + & {
    margin-left: ${gutter(4)};
  }
`;
