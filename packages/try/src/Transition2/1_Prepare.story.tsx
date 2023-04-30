import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { Issues } from './common/Issues';
import { usePageNumberV1 } from './common/usePageNumber';

export const Story = () => {
  const { page, incrementPage, decrementPage } = usePageNumberV1();

  return (
    <div className={styleBase}>
      <div>
        <button onClick={decrementPage}>前へ</button>
        <button onClick={incrementPage}>次へ</button>
      </div>

      <Issues page={page} />
    </div>
  );
};

const styleBase = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;
