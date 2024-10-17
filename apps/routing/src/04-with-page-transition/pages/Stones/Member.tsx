import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useParams } from 'react-router-dom';
import { MemberData } from './data';
import { type MemberType } from './type';

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

function getMemberById(id: string): MemberType | undefined {
  return MemberData.find((f) => f.id === id);
}

const styleBase = css`
  padding: ${gutter(4)};
  border: 1px solid;
`;
