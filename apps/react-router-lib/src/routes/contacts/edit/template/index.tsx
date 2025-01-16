import { clsx } from 'clsx';
import { type FC } from 'react';
import { Form } from 'react-router';
import { Button } from '../../../../components/Button';
import { TextArea } from '../../../../components/TextArea';
import { TextInput } from '../../../../components/TextInput';
import { type ContactRecord } from '../../../../data';
import styles from './styles.module.css';

type Props = {
  contact: ContactRecord;
  onCancel: () => void;
};

/**
 * The Edit Contact form template.
 */
export const Template: FC<Props> = ({ contact, onCancel }) => (
  <Form key={contact.id} className={styles.base} method="post">
    <p className={styles['form-group']}>
      <span className={styles['label-display']}>Name</span>
      <div className={styles['form-item']}>
        <TextInput aria-label="First name" defaultValue={contact.first} name="first" placeholder="First" />
        <TextInput aria-label="Last name" defaultValue={contact.last} name="last" placeholder="Last" />
      </div>
    </p>

    <label className={styles['form-group']}>
      <span className={styles['label-display']}>Twitter</span>
      <div className={styles['form-item']}>
        <TextInput name="twitter" defaultValue={contact.twitter} placeholder="@jack" />
      </div>
    </label>

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
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </p>
  </Form>
);
