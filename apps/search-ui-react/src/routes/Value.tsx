import { ChangeEvent, FC, Suspense, use, useEffect, useState } from 'react';
import { ContactRecord, getContacts } from '../data';
import { useDebouncedState } from '../hooks/useDebouncedValue';

export const Value: FC = () => {
  const [dataPromise, setDataPromise] = useState(() => getContacts());

  const [query, debouncedQuery, setQuery] = useDebouncedState('', 300);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setDataPromise(getContacts(debouncedQuery));
  }, [debouncedQuery]);

  return (
    <div>
      <form>
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
