import { css } from '@emotion/css';
import { SplashBanner } from '@learn-react/core/src/components/surfaces/SplashBanner';
import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { cssVar } from '@learn-react/core/src/helpers/Style';

/**
 * Catalog のトップに表示するページコンポーネントです。
 */
export const IndexPage = () => (
  <>
    <DocumentTitle title="Catalog" />
    <section className={styleBase}>
      <SplashBanner title="Catalog | Learn React" />
    </section>
  </>
);

const styleBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  background-color: ${cssVar('TextureCode')};
`;
