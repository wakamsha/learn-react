import { ChangeEvent, FC, SubmitEvent, useState } from 'react';
import { Form, LoaderFunctionArgs, useLoaderData, useNavigation, useSubmit } from 'react-router';
import { getContacts } from '../../data';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const q = url.searchParams.get('query');

  const contacts = await getContacts(q);

  return {
    contacts,
    q,
  };
}

export const Component: FC = () => {
  const { contacts, q } = useLoaderData<typeof loader>();

  const navigation = useNavigation();

  const submit = useSubmit();

  const [query, setQuery] = useState(q ?? '');

  const searching = (navigation.location && new URLSearchParams(navigation.location.search).has('query')) ?? false;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormChange = async (event: SubmitEvent<HTMLFormElement>) => {
    const isFirstSearch = q === null;

    await submit(event.currentTarget, {
      replace: !isFirstSearch,
    });
  };

  return (
    <div>
      {/* MEMO: HTML 標準の form 要素でも期待どおりに動作する。 */}
      <Form onChange={handleFormChange}>
        <input name="query" value={query} onChange={handleQueryChange} />
        {searching ? <span>🔃</span> : null}
      </Form>

      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
