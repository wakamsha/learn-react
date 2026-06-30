import { ChangeEvent, FC, Suspense, use, useState } from 'react';
import { ContactRecord, getContacts } from '../data';
import { useDebouncedCallback } from '../hooks/useDebouncedCallback';

export const Callback: FC = () => {
  const [dataPromise, setDataPromise] = useState(() => getContacts());

  const [query, setQuery] = useState('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedSubmit = useDebouncedCallback(async () => {
    setDataPromise(getContacts(query));
  }, 300);

  return (
    <div>
      <form onChange={debouncedSubmit}>
        <input name="query" value={query} onChange={handleQueryChange} />
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        <Contacts dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
};

type ContactsProps = {
  dataPromise: Promise<ContactRecord[]>;
};

const Contacts: FC<ContactsProps> = ({ dataPromise }) => {
  const data = use(dataPromise);

  return data.length > 0 ? (
    <ul>
      {data.map((contact) => (
        <li key={contact.id}>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No name</i>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <div>No contacts</div>
  );
};
