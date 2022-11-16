import { gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import { useParams } from 'react-router';
import { getMemberById } from '.';

export const Member = () => {
  const { id = '' } = useParams();

  const member = getMemberById(id);

  if (!member) {
    return <p>Stones with id {id} does not exist.</p>;
  }

  return (
    <article className={styleBase}>
      <h3>
        {member.nameJa} <small>{member.nameEn}</small>
      </h3>
      <p>{member.family}</p>
    </article>
  );
};

const styleBase = css`
  padding: ${gutter(4)};
  border: 1px solid;
`;
