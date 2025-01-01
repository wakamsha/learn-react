import { css } from '@emotion/css';
import { BorderRadius } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { type Params, useLoaderData } from 'react-router';
import { getZeppelinMember } from './data';

export async function clientLoader({ params: { member } }: { params: Params<'member'> }) {
  const memberData = await getZeppelinMember(member ?? '');

  if (!memberData) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return {
    memberData,
  };
}
/**
 * ツェッペリン メンバー詳細を表示するページコンポーネントです。
 */
export const Member = () => {
  const { memberData } = useLoaderData<typeof clientLoader>();

  return (
    <div className={styleBase}>
      <img
        key={memberData.avatar_url}
        className={styleImage}
        src={memberData.avatar_url}
        alt={`${memberData.name} avatar`}
      />

      <h2 className={styleTitle}>{memberData.name}</h2>

      <p className={styleNotes}>{memberData.notes}</p>
    </div>
  );
};

const styleBase = css`
  display: grid;
  grid-template-areas:
    'image title'
    'image notes';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  gap: ${gutter(4)};
`;

const styleImage = css`
  grid-area: image;
  width: 160px;
  height: 160px;
  object-fit: cover;
  background: ${cssVar('TexturePaper')};
  border-radius: ${BorderRadius.Medium};
`;

const styleTitle = css`
  grid-area: title;
  margin: 0;
`;

const styleNotes = css`
  grid-area: notes;
`;
