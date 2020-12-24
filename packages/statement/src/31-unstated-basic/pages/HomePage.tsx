import { SplashBanner } from '@learn-react/core/components/SplashBanner';
import { Color } from '@learn-react/core/constants/Style';
import { css } from 'emotion';

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
