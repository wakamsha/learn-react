import { clsx } from 'clsx';
import type { FC } from 'react';
import { Form } from 'react-router';
import { Button } from '../../../components/Button';
import { TextArea } from '../../../components/TextArea';
import { TextInput } from '../../../components/TextInput';
import type { ContactRecord } from '../../../data';
import styles from './styles.module.css';

type Props = {
  contact: ContactRecord;
  onCancel: () => void;
};

/**
 * The Edit Contact form.
 */
export const Template: FC<Props> = ({ contact, onCancel }) => (
  <Form key={contact.id} className={styles.base} method="post">
    <p className={styles.formGroup}>
      <span className={styles.labelDisplay}>Name</span>
      <div className={styles.formItem}>
        <TextInput aria-label="First name" defaultValue={contact.first} name="first" placeholder="First" />
        <TextInput aria-label="Last name" defaultValue={contact.last} name="last" placeholder="Last" />
      </div>
    </p>

    <label className={styles.formGroup}>
      <span className={styles.labelDisplay}>Twitter</span>
      <div className={styles.formItem}>
        <TextInput name="twitter" defaultValue={contact.twitter} placeholder="@jack" />
      </div>
    </label>

    <label className={styles.formGroup}>
      <span className={styles.labelDisplay}>Avatar URL</span>
      <div className={styles.formItem}>
        <TextInput
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
    </label>

    <label className={styles.formGroup}>
      <span className={styles.labelDisplay}>Notes</span>
      <div className={styles.formItem}>
        <TextArea defaultValue={contact.notes} name="notes" rows={6} />
      </div>
    </label>

    <p className={clsx(styles.formGroup, styles.controls)}>
      <Button>Save</Button>
      <Button type="button" theme="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </p>
  </Form>
);
