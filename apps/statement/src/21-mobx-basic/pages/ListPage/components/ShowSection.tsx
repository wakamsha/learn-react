import { observer } from 'mobx-react';
import { type ListStore } from '../stores/ListStore';

type Props = {
  listStore: ListStore;
};

export const ShowSection = observer(({ listStore }: Props) => (
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
