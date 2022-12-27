import { DocumentTitle } from '@learn-react/core/components/utils/DocumentTitle';
import { SplitPane } from '@learn-react/core/components/utils/SplitPane';
import { FontFamily, FontSize, LineHeight } from '@learn-react/core/constants/Style';
import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
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

  const { layoutConfig } = LayoutConfigContainer.useContainer();

  const storyParams = storyId.split('__');

  const { sourceCode } = useMemo(() => {
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

      <div className={styleBase}>
        <header className={styleHeader}>
          <h1 className={styleTitle}>{`@learn-react/${storyParams.join('/')}`}</h1>
          <LayoutSwitch />
        </header>

        <div className={styleBody}>
          <SplitPane
            primary="second"
            defaultSize="40%"
            minSize="20%"
            maxSize="80%"
            orientation={layoutConfig !== Layout.Zen ? layoutConfig : Layout.Horizontal}
          >
            <iframe
              src={`/preview.html?storyId=${storyId}`}
              title={storyParams.slice().reverse().join(' | ')}
              className={stylePreview}
              sandbox="allow-scripts"
            />

            {layoutConfig !== Layout.Zen ? (
              <aside className={styleCodeBlock}>
                <div className={styleCodeBlockBody}>
                  <CodeBlock>{sourceCode}</CodeBlock>
                </div>
              </aside>
            ) : null}
          </SplitPane>
        </div>
      </div>
    </>
  );
};

const styleBase = css`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100dvh;
  overflow: hidden;
  color: ${cssVar('TextNeutral')};
  background-color: ${cssVar('TextureBody')};
`;

const styleHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${gutter(2)} ${gutter(6)};
  line-height: ${LineHeight.Compressed};
`;

const styleTitle = css`
  font-family: ${FontFamily.Monospace};
  font-size: ${FontSize.Small};
  font-weight: normal;
  color: ${cssVar('TextSub')};
  letter-spacing: 1px;
`;

const styleBody = css`
  overflow: hidden;
`;
const stylePreview = css`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
`;

const styleCodeBlock = css`
  height: 100%;
  background-color: #282c34;
`;

const styleCodeBlockBody = css`
  height: 100%;
  overflow: auto;
`;
