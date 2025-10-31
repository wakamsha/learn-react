import type { FC, FormEvent } from 'react';
import { Form } from 'react-router';
import { Button } from '../../../components/Button';
import type { ContactRecord } from '../../../data';
import { Favorite } from './Favorite';
import styles from './styles.module.css';

type Props = {
  contact: ContactRecord;
};

/**
 * The contact page.
 */
export const Template: FC<Props> = ({ contact }) => {
  const handleDestroy = (event: FormEvent) => {
    // oxlint-disable-next-line no-alert, no-restricted-globals
    const response = confirm('Please confirm you want to delete this record.');

    if (!response) {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.base}>
      <div>
        <img
          key={contact.avatar}
          className={styles.image}
          alt={`${contact.first} ${contact.last} avatar`}
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
          <Form action="edit">
            <Button>Edit</Button>
          </Form>

          <Form action="destroy" method="post" onSubmit={handleDestroy}>
            <Button theme="danger" type="submit">
              Delete
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
