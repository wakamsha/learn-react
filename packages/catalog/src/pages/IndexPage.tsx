import { css } from '@emotion/css';
import { SplashBanner } from '@learn-react/core/components/surfaces/SplashBanner';
import { Color } from '@learn-react/core/constants/Style';

export const IndexPage = () => (
  <section className={styleBase}>
    <SplashBanner title="Catalog | Learn React" />
  </section>
);

const styleBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${Color.TextureCode};
`;
