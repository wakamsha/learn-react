import { gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import { Issues } from './common/Issues';
import { usePageNumberV1 } from './common/usePageNumber';

/**
 * @see https://qiita.com/stin_dev/items/74ae0b002bc2f98b71ce
 */
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
