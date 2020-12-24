import { css } from 'emotion';
import { useParams } from 'react-router-dom';
import { BEATLES } from '.';

type Params = {
  id: string;
};

export const Beatle = () => {
  const { id } = useParams<Params>();

  const beatle = BEATLES.find(beatle => beatle.id === id);

  return beatle ? (
    <article className={containerStyle}>
      <h3>
        {beatle.nameEn} ( <small>{beatle.nameJa}</small> )
      </h3>
      <p>{beatle.part}</p>
    </article>
  ) : (
    <p>The Beatles with id {id} does not exist.</p>
  );
};

const containerStyle = css({
  padding: 16,
  border: '1px solid',
});
