import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { type FC } from 'react';
import { useLoaderData, type Params } from 'react-router';
import { getContact, updateContact } from '../../../data';
import { Template } from './template';

/**
 * Fetches contact data and returns it as a prop.
 */
export async function loader({ params: { contactId } }: { params: Params<'contactId'> }) {
  if (!contactId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const contact = await getContact(contactId);

  if (!contact) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return {
    contact,
  };
}

/**
 * Updates the favorite status of a contact.
 */
export async function action({ request, params: { contactId } }: { request: Request; params: Params<'contactId'> }) {
  if (!contactId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const formData = await request.formData();

  return updateContact(contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

/**
 * The contact page.
 */
export const Component: FC = () => {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <>
      <DocumentTitle title={`${contact.first ?? ''} ${contact.last ?? ''}`} />

      <Template contact={contact} />
    </>
  );
};
