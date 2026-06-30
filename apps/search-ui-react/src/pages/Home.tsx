import { ChangeEvent, FC, Suspense, use, useState } from 'react';
import { ContactRecord, getContacts } from '../data';

export const Home: FC = () => {
  const [dataPromise, setDataPromise] = useState(() => getContacts());

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataPromise(getContacts(event.target.value));
  };

  return (
    <div>
      <form>
        <input name="query" onChange={handleQueryChange} />
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
