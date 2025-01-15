import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { type FC, type FormEvent } from 'react';
import { Form, generatePath, useLoaderData, type Params } from 'react-router';
import { Button } from '../../../components/Button';
import { getContact, updateContact } from '../../../data';
import { Paths } from '../../../routes';
import { Favorite } from './Favorite';
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
 * Updates the favorite status of a contact.
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

  return updateContact(contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

/**
 * The contact page.
 */
export const Contact: FC = () => {
  const { contact } = useLoaderData<typeof clientLoader>();

  const handleDestroy = (event: FormEvent) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const response = confirm('Please confirm you want to delete this record.');

    if (!response) {
      event.preventDefault();
    }
  };

  return (
    <>
      <DocumentTitle title={`${contact.first ?? ''} ${contact.last ?? ''}`} />

      <div className={styles.base}>
        <div>
          <img
            key={contact.avatar}
            className={styles.image}
            alt={`${contact.first ?? ''} ${contact.last ?? ''} avatar`}
            src={contact.avatar}
          />
        </div>

        <div>
          <h1 className={styles.title}>
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}
            <Favorite favorite={contact.favorite} />
          </h1>

          {contact.twitter ? (
            <p className={styles.twitter}>
              <a className={styles.link} href={`https://x.com/${contact.twitter}`}>
                {contact.twitter}
              </a>
            </p>
          ) : null}

          {contact.notes ? <p className={styles.notes}>{contact.notes}</p> : null}

          <div className={styles.controls}>
            <Form
              action={generatePath(Paths.Contacts.Edit, {
                contactId: contact.id,
              })}
            >
              <Button type="submit">Edit</Button>
            </Form>

            <Form
              action={generatePath(Paths.Contacts.Destroy, {
                contactId: contact.id,
              })}
              method="post"
              onSubmit={handleDestroy}
            >
              <Button theme="danger" type="submit">
                Delete
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
