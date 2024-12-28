import { redirect } from 'react-router';
import { createEmptyContact } from '../../data';

/**
 * Deletes a contact.
 */
export async function action() {
  console.info('Creating a new contact...');
  const contact = await createEmptyContact();

  return redirect(`/contacts/${contact.id}/edit`);
}
