import { css, cx } from '@emotion/css';
import { DocumentTitle } from '@learn-react/core/components/utils/DocumentTitle';
import { BorderRadius, Color, FontFamily, FontSize, LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { stories } from '../../constants/Stories';
import { storySpec } from '../../constants/StorySpec';
import { CodeBlock } from './CodeBlock';
import { LayoutConfigContainer } from './LayoutConfigContainer';
import { LayoutSwitch } from './LayoutSwitch';
import { Layout } from './VO';

export const StoryPage = () => (
  <LayoutConfigContainer.Provider>
    <Inner />
  </LayoutConfigContainer.Provider>
);

type Params = {
  subPackage: string;
  type: string;
  category: string;
  story: string;
};

const Inner = () => {
  const { subPackage, type, category, story } = useParams<Params>();

  const { layoutConfig } = LayoutConfigContainer.useContainer();

  const Component = useMemo(
    () => (category !== '-' ? (stories as any)[subPackage][type][category][story] : stories[subPackage][type][story]),
    [story, subPackage, type, category],
  );

  const storySpecKey = `${subPackage}/${type}/${
    category !== '-' ? `${category}/` : ''
  }${story}` as keyof typeof storySpec;

  return (
    <>
      <DocumentTitle title={story} baseTitle="Catalog | Learn React" />
      <div className={styleLayout[layoutConfig]}>
        <section className={stylePreview}>
          <header className={styleHeader}>
            <small>{`@learn-react/${subPackage}/${type}/${category !== '-' ? `${category}/` : ''}`}</small>
            <h1>{story}</h1>
          </header>
          <Component />
        </section>

        {layoutConfig !== Layout.Zen ? (
          <aside className={styleCodeBlock}>
            <div className={styleCodeBlockBody}>
              {storySpec[storySpecKey] ? <CodeBlock>{storySpec[storySpecKey]}</CodeBlock> : null}
            </div>
          </aside>
        ) : null}
      </div>
      <LayoutSwitch />
    </>
  );
};

const styleBase = css`
  display: flex;
  height: 100vh;
  color: ${Color.TextNeutral};
  background: #f6f6f8;
`;

const styleLayout: Frozen<Layout, string> = {
  [Layout.Column]: cx(
    styleBase,
    css`
      > :first-child {
        width: 60%;
      }

      > :last-child {
        width: 40%;
      }
    `,
  ),
  [Layout.Row]: cx(
    styleBase,
    css`
      flex-direction: column;

      > :first-child {
        height: 60%;
      }

      > :last-child {
        height: 40%;
      }
    `,
  ),
  [Layout.Zen]: styleBase,
};

const styleHeader = css`
  display: grid;
  flex-direction: column;
  grid-gap: ${gutter(2)};
  margin: 0 0 ${gutter(8)};
  line-height: ${LineHeight.Compressed};

  > small {
    font-family: ${FontFamily.Monospace};
    font-size: ${FontSize.Small};
    color: ${Color.TextSub};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  > h1 {
    margin: 0;
    font-size: 24px;
  }
`;

const stylePreview = css`
  flex: 1 0 60%;
  padding: ${gutter(4)} ${gutter(6)};
  overflow-y: auto;

  > h3,
  > h4 {
    margin: 2em 0 0.5em;
  }

  > hr {
    margin: ${gutter(6)} 0;
  }

  pre {
    display: block;
    max-width: 100%;
    padding: ${gutter(4)};
    margin: ${gutter(6)} 0;
    overflow: auto;
    background-color: ${Color.TextureInput};
    border: 1px solid ${Color.LineDefault};
    border-radius: ${BorderRadius.Small};

    > code {
      font-family: ${FontFamily.Monospace};
      font-size: ${FontSize.Small};
    }
  }
`;

const styleCodeBlock = css`
  display: flex;
  flex: 1 0 40%;
  background-color: #282c34;
`;

const styleCodeBlockBody = css`
  flex: 1 1 100%;
  overflow: auto;
`;
