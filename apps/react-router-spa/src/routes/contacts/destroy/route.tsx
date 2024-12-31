import { redirect } from 'react-router';
import { deleteContact } from '../../../data';
import type { Route } from './+types/route';

/**
 * Delete a contact.
 */
export async function clientAction({ params: { contactId } }: Route.ActionArgs) {
  await deleteContact(contactId);

  return redirect('/');
}
