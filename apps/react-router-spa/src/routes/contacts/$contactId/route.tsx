import { getContact } from '../../../data';
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
 * Sets the title of the page.
 */
export function meta({ data: { contact } }: Route.MetaArgs) {
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
