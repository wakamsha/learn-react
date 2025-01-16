import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { type FC } from 'react';
import { generatePath, redirect, useLoaderData, useNavigate, type Params } from 'react-router';
import { getContact, updateContact } from '../../../data';
import { Paths } from '../../../routes';
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
 * Updates a contact.
 *
 * @remarks
 * After updating the contact, the user is redirected to the contact page.
 */
export async function action({ request, params: { contactId } }: { request: Request; params: Params<'contactId'> }) {
  if (!contactId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const formData = await request.formData();

  const updates = Object.fromEntries(formData);

  await updateContact(contactId, updates);

  return redirect(generatePath(Paths.Contacts.Contact, { contactId }));
}

/**
 * The Edit Contact form.
 */
export const Component: FC = () => {
  const { contact } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const handleCancel = async () => {
    await navigate(-1);
  };

  return (
    <>
      <DocumentTitle title={`Edit ${contact.first} ${contact.last}`} />

      <Template contact={contact} onCancel={handleCancel} />
    </>
  );
};
