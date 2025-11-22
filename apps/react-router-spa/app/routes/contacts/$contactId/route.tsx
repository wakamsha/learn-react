import { useLoaderData } from 'react-router';
import { getContact, updateContact } from '../../../data';
import type { Route } from './+types/route';
import { Template } from './Template';

/**
 * Fetches contact data and returns it as a prop.
 */
export async function clientLoader({ params: { contactId } }: Route.LoaderArgs) {
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
export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();

  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

/**
 * Renders the contact page.
 */
export default () => {
  const { contact } = useLoaderData<typeof clientLoader>();

  const baseTitle = 'Address Book | React Router Tutorial';

  return (
    <>
      <title>
        {contact.first || contact.last ? `${contact.first} ${contact.last} | ${baseTitle}` : `No Name | ${baseTitle}`}
      </title>
      <Template contact={contact} />
    </>
  );
};
