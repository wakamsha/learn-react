import { css } from '@emotion/css';
import { SplashBanner } from '@learn-react/core/components/surfaces/SplashBanner';
import { DocumentTitle } from '@learn-react/core/components/utils/DocumentTitle';
import { cssVar } from '@learn-react/core/helpers/Style';

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
  height: 100vh;
  background-color: ${cssVar('TextureCode')};
`;
