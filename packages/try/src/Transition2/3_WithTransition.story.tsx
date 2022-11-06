import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import { Suspense } from 'react';
import { Issues } from './common/Issues';
import { usePageNumberV2 } from './common/usePageNumber';

/**
 * @see https://qiita.com/stin_dev/items/74ae0b002bc2f98b71ce#usetransition-を使う
 */
export const Story = () => {
  const { page, isPending, incrementPage, decrementPage } = usePageNumberV2();

  return (
    <div className={styleBase}>
      <div>
        <button disabled={isPending} onClick={decrementPage}>
          前へ
        </button>
        <button disabled={isPending} onClick={incrementPage}>
          次へ
        </button>
        {isPending ? <span className={styleIndicator}>Loading...</span> : null}
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <Issues page={page} suspense />
      </Suspense>
    </div>
  );
};

const styleBase = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;

const styleIndicator = css`
  font-weight: bold;
  color: ${cssVar('ThemeDangerNeutral')};
`;
