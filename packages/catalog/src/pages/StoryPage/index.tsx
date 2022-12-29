import { Icon } from '@learn-react/core/components/dataDisplay/Icon';
import { Tooltip } from '@learn-react/core/components/dataDisplay/Tooltip';
import { DocumentTitle } from '@learn-react/core/components/utils/DocumentTitle';
import { SplitPane } from '@learn-react/core/components/utils/SplitPane';
import { FontFamily, FontSize, IconSize, LineHeight } from '@learn-react/core/constants/Style';
import { cssVar, gutter, square, textEllipsis } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import { useId } from 'react';
import { useParams } from 'react-router-dom';
import { useStory } from '../../hooks/useStory';
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

  const outerLinkId = useId();

  const storyKeys = storyId.split('__');

  const { sourceCode } = useStory(storyKeys);

  return (
    <>
      <DocumentTitle title={storyKeys.slice().reverse().join(' | ')} baseTitle="Catalog | Learn React" />

      <div className={styleBase}>
        <header className={styleHeader}>
          <h1 className={styleTitle}>{`@learn-react/${storyKeys.join('/')}`}</h1>

          <div className={styleControls}>
            <a
              href={`/preview.html?storyId=${storyId}`}
              id={outerLinkId}
              className={styleOuterLink}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="open-window" />
            </a>
            <Tooltip targetId={outerLinkId}>Go fullscreen</Tooltip>
            <LayoutSwitch />
          </div>
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
              title={storyKeys.slice().reverse().join(' | ')}
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
  gap: ${gutter(6)};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${gutter(2)} ${gutter(6)};
  overflow: hidden;
`;

const styleTitle = css`
  font-family: ${FontFamily.Monospace};
  font-size: ${FontSize.Small};
  font-weight: normal;
  line-height: ${LineHeight.Compressed};
  color: ${cssVar('TextSub')};
  letter-spacing: 1px;
  ${textEllipsis()}
`;

const styleControls = css`
  display: flex;
  gap: ${gutter(6)};
`;

const styleOuterLink = css`
  display: inline-flex;
  place-content: center;
  padding: ${gutter(0.5)};
  background-color: ${cssVar('ThemePrimaryDark')};
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  > svg {
    ${square(IconSize.Regular)}
    fill: white;
  }
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
