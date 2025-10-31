import { getContact, updateContact } from '../../data';
import type { Route } from './+types/route';
import { Template } from './Template';

/**
 * Fetches contact data and returns it as a prop.
 */
export async function loader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.contactId);

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
export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();

  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

/**
 * Sets the title of the page.
 */
export function meta({ contact }: Route.MetaArgs['loaderData']) {
  const baseTitle = 'Address Book | React Router Tutorial';

  return [
    {
      title:
        contact.first || contact.last ? `${contact.first} ${contact.last} | ${baseTitle}` : `No Name | ${baseTitle}`,
    },
  ];
}

/**
 * Renders the contact page.
 */
export default ({ loaderData: { contact } }: Route.ComponentProps) => <Template contact={contact} />;
