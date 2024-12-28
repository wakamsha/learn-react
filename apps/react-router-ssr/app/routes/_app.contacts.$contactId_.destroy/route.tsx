import { redirect } from 'react-router';
import { deleteContact } from '../../data';
import type { Route } from '../_app.contacts.$contactId_.destroy/+types/route';

/**
 * Deletes a contact.
 */
export async function action({ params }: Route.ActionArgs) {
  await deleteContact(params.contactId);

  return redirect('/');
}
