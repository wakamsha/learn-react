import { css } from '@emotion/css';
import { SplashBanner } from '@learn-react/core/src/components/surfaces/SplashBanner';
import { cssVar } from '@learn-react/core/src/helpers/Style';

/**
 * Catalog のトップに表示するページコンポーネントです。
 */
export const IndexPage = () => (
  <>
    <title>Catalog | Learn React</title>
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
