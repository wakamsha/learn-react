import { SplashBanner } from '@learn-react/core/components/SplashBanner';
import { Color } from '@learn-react/core/constants/Style';
import { css } from 'emotion';

export const IndexPage = () => (
  <section className={baseStyle}>
    <SplashBanner title="Component Catalog" />
  </section>
);

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${Color.TextureCode};
`;
