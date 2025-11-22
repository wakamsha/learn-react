import { clsx } from 'clsx';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { Form, Link, NavLink } from 'react-router';
import { Button } from '../../../components/Button';
import { TextInput } from '../../../components/TextInput';
import type { ContactRecord } from '../../../data';
import styles from './styles.module.css';

type Props = {
  contacts: ContactRecord[];
  query: string;
  /**
   * Whether the search is in progress.
   *
   * @default false
   */
  searching?: boolean;
  onQueryChange: (query: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

/**
 * The sidebar for the app.
 */
export const Sidebar: FC<Props> = ({ contacts, query, searching = false, onQueryChange, onSubmit }) => {
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);
  };

  return (
    <div className={styles.base}>
      <h1 className={styles.title}>
        <Link className={styles.titleLink} to="/about">
          React Router Contacts
        </Link>
      </h1>

      <div className={styles.formWrapper}>
        <Form className={styles.form} id="search-form" role="search" onChange={handleFormChange}>
          <TextInput
            aria-label="Search contacts"
            id="q"
            loading={searching}
            name="q"
            defaultValue={query}
            placeholder="Search"
            type="search"
            value={query}
            onChange={handleQueryChange}
          />
          <div aria-hidden hidden={!searching} className={styles.searchSpinner} />
        </Form>

        <Form className={styles.form} action="/new" method="post">
          <Button theme="primary" type="submit">
            New
          </Button>
        </Form>
      </div>

      <nav className={styles.navigation}>
        {contacts.length > 0 ? (
          <ul className={styles.contactList}>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    clsx(
                      styles.contactLink,
                      isActive ? styles.contactLinkActive : isPending ? styles.contactLinkPending : '',
                    )
                  }
                  to={`contacts/${contact.id}`}
                >
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i className={styles.temporary}>No Name</i>
                  )}
                  {contact.favorite ? <span className={styles.favorite}>★</span> : null}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
    </div>
  );
};
