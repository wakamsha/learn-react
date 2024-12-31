import { generatePath, redirect } from 'react-router';
import { createEmptyContact } from '../../data';

/**
 * Creates a new contact and redirects to the edit page.
 */
export async function clientAction() {
  console.info('Creating a new contact...');

  const contact = await createEmptyContact();

  return redirect(
    generatePath('/contacts/:contactId/edit', {
      contactId: contact.id,
    }),
  );
}
