import { redirect, useLoaderData, useNavigate } from 'react-router';
import { getContact, updateContact } from '../../data';
import type { Route } from './+types/route';
import { Template } from './Template';

/**
 * Fetches contact data and returns it as a prop.
 */
export async function loader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.contactId);

  if (!contact) {
    throw new Response('Not Found', { status: 404 });
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
export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();

  const updates = Object.fromEntries(formData);

  await updateContact(params.contactId, updates);

  return redirect(`/contacts/${params.contactId}`);
}

/**
 * Renders the edit contact page.
 */
export default () => {
  const { contact } = useLoaderData<typeof loader>();

  const baseTitle = 'Address Book | React Router Tutorial';

  const navigate = useNavigate();

  const handleCancel = async () => {
    await navigate(-1);
  };

  return (
    <>
      <title>
        {contact.first || contact.last ? `${contact.first} ${contact.last} | ${baseTitle}` : `No Name | ${baseTitle}`}
      </title>
      <Template contact={contact} onCancel={handleCancel} />
    </>
  );
};
