import { generatePath, redirect } from 'react-router';
import { createEmptyContact } from '../../data';
import { Paths } from '../../routes';

/**
 * Creates a new contact and redirects to the edit page.
 */
export async function clientAction() {
  console.info('Creating a new contact...');

  const contact = await createEmptyContact();

  return redirect(
    generatePath(Paths.Contacts.ContactEdit, {
      contactId: contact.id,
    }),
  );
}
