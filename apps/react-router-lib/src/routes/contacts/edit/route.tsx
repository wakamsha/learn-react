import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { clsx } from 'clsx';
import { type FC } from 'react';
import { Form, generatePath, redirect, useLoaderData, useNavigate, type Params } from 'react-router';
import { Button } from '../../../components/Button';
import { TextArea } from '../../../components/TextArea';
import { TextInput } from '../../../components/TextInput';
import { getContact, updateContact } from '../../../data';
import { Paths } from '../../../routes';
import styles from './styles.module.css';

/**
 * Fetches contact data and returns it as a prop.
 */
export async function clientLoader({ params: { contactId } }: { params: Params<'contactId'> }) {
  if (!contactId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

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
 * Updates a contact.
 *
 * @remarks
 * After updating the contact, the user is redirected to the contact page.
 */
export async function clientAction({
  request,
  params: { contactId },
}: {
  request: Request;
  params: Params<'contactId'>;
}) {
  if (!contactId) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const formData = await request.formData();

  const updates = Object.fromEntries(formData);

  await updateContact(contactId, updates);

  return redirect(generatePath(Paths.Contacts.Contact, { contactId }));
}

/**
 * The Edit Contact form.
 */
export const Edit: FC = () => {
  const { contact } = useLoaderData<typeof clientLoader>();

  const navigate = useNavigate();

  const handleCancel = async () => {
    await navigate(-1);
  };

  return (
    <>
      <DocumentTitle title={`Edit ${contact.first} ${contact.last}`} />

      <Form key={contact.id} className={styles.base} method="post">
        <p className={styles['form-group']}>
          <span className={styles['label-display']}>Name</span>
          <div className={styles['form-item']}>
            <TextInput aria-label="First name" defaultValue={contact.first} name="first" placeholder="First" />
            <TextInput aria-label="Last name" defaultValue={contact.last} name="last" placeholder="Last" />
          </div>
        </p>

        {}
        <label className={styles['form-group']}>
          <span className={styles['label-display']}>Twitter</span>
          <div className={styles['form-item']}>
            <TextInput name="twitter" defaultValue={contact.twitter} placeholder="@jack" />
          </div>
        </label>

        {}
        <label className={styles['form-group']}>
          <span className={styles['label-display']}>Avatar URL</span>
          <div className={styles['form-item']}>
            <TextInput
              aria-label="Avatar URL"
              defaultValue={contact.avatar}
              name="avatar"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </label>

        {}
        <label className={styles['form-group']}>
          <span className={styles['label-display']}>Notes</span>
          <div className={styles['form-item']}>
            <TextArea defaultValue={contact.notes} name="notes" rows={6} />
          </div>
        </label>

        <p className={clsx(styles['form-group'], styles.controls)}>
          <Button>Save</Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </p>
      </Form>
    </>
  );
};
