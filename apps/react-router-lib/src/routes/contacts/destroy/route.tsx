import { type Params, redirect } from 'react-router';
import { deleteContact } from '../../../data';
import { Paths } from '../../../routes';

/**
 * Delete a contact.
 */
export async function action({ params: { contactId } }: { params: Params<'contactId'> }) {
  if (!contactId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  await deleteContact(contactId);

  return redirect(Paths.Home);
}
