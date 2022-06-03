import { css, cx } from '@emotion/css';
import { DocumentTitle } from '@learn-react/core/components/utils/DocumentTitle';
import { BorderRadius, FontFamily, FontSize, LineHeight } from '@learn-react/core/constants/Style';
import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { stories } from '../../constants/Stories';
import { CodeBlock } from './CodeBlock';
import { LayoutConfigContainer } from './LayoutConfigContainer';
import { LayoutSwitch } from './LayoutSwitch';
import { Layout } from './VO';

export const StoryPage = () => (
  <LayoutConfigContainer.Provider>
    <Presentation />
  </LayoutConfigContainer.Provider>
);

type Params = {
  storyId: string;
};

const Presentation = () => {
  const { storyId = '' } = useParams<keyof Params>();

  const storyParams = storyId.split('__');

  const { layoutConfig } = LayoutConfigContainer.useContainer();

  const { Component, sourceCode } = useMemo(() => {
    let snapShot: any = stories;

    for (let i = 0; i < storyParams.length; i++) {
      if (!snapShot[storyParams[i]]) {
        break;
      }
      snapShot = snapShot[storyParams[i]];
    }

    return snapShot as { Component: FC; sourceCode: string };
  }, [storyParams]);

  return (
    <>
      <DocumentTitle title={storyParams.slice().reverse().join(' | ')} baseTitle="Catalog | Learn React" />
      <div className={styleLayout[layoutConfig]}>
        <section className={stylePreview}>
          <header className={styleHeader}>
            <small>{`@learn-react/${storyParams.join('/')}`}</small>
            <h1>{storyParams.slice(-1)[0]}</h1>
          </header>
          <Component />
        </section>

        {layoutConfig !== Layout.Zen ? (
          <aside className={styleCodeBlock}>
            <div className={styleCodeBlockBody}>
              <CodeBlock>{sourceCode}</CodeBlock>
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
  color: ${cssVar('TextNeutral')};
  background-color: ${cssVar('TextureBody')};
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
    color: ${cssVar('TextSub')};
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

  > h2,
  > h3,
  > h4 {
    margin: 2em 0 0.5em;
  }

  > h2 {
    font-size: 20px;
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
    background-color: ${cssVar('TextureInput')};
    border: 1px solid ${cssVar('LineNeutral')};
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
