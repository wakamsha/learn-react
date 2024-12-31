import { useFetcher } from 'react-router';
import type { ContactRecord } from '../../../../../data';
import styles from './styles.module.css';

type FavoriteProps = Pick<ContactRecord, 'favorite'>;

/**
 * A button to toggle a favorite contact.
 */
export const Favorite = ({ favorite: favoriteRaw }: FavoriteProps) => {
  const { Form, formData } = useFetcher();

  const favorite = formData ? formData.get('favorite') === 'true' : favoriteRaw;

  return (
    <Form method="post" className={styles.base}>
      <button
        className={styles.button}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
};
