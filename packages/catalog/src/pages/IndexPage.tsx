import { css } from '@emotion/css';
import { SplashBanner } from '@learn-react/core/components/SplashBanner';
import { Color } from '@learn-react/core/constants/Style';

export const IndexPage = () => (
  <section className={baseStyle}>
    <SplashBanner title="React Catalog" />
  </section>
);

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${Color.TextureCode};
`;
