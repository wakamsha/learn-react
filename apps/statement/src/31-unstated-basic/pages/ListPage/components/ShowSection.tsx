import { css } from '@emotion/css';
import { FontFamily, LineHeight } from '@learn-react/core/src/constants/Style';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { ListContainer } from '../containers/ListContainer';

export const ShowSection = () => {
  console.info('show section');

  const { items } = ListContainer.useContainer();

  return (
    <figure className={styleBase}>
      <pre>
        <code>{JSON.stringify(items, null, 2)}</code>
      </pre>
    </figure>
  );
};

const styleBase = css`
  height: 100%;
  margin: 0;
  background-color: #0f192a;

  > pre {
    height: 100%;
    padding: ${gutter(4)};
    margin: 0;
    overflow: auto;
    color: #d1edff;

    > code {
      font-family: ${FontFamily.Monospace};
      font-size: 0.9rem;
      line-height: ${LineHeight.Compressed};
    }
  }
`;
