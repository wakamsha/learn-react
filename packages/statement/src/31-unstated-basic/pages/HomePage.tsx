import { css } from '@emotion/css';
import { SplashBanner } from '@learn-react/core/components/SplashBanner';
import { Color } from '@learn-react/core/constants/Style';

export const HomePage = () => (
  <section className={baseStyle}>
    <SplashBanner title="Unstated Basic" />
  </section>
);

const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${Color.TextureCode};
`;
