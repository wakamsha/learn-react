import { css, cx } from '@emotion/css';
import { Icon } from '@learn-react/core/src/components/dataDisplay/Icon';
import { Tooltip } from '@learn-react/core/src/components/dataDisplay/Tooltip';
import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { SplitPane } from '@learn-react/core/src/components/utils/SplitPane';
import { Duration, Easing, FontFamily, FontSize, LineHeight } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter, textEllipsis } from '@learn-react/core/src/helpers/Style';
import { nonNull } from '@learn-react/core/src/helpers/Type';
import { useId, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStory } from '../../hooks/useStory';
import { CodeBlock } from './CodeBlock';
import { LayoutConfigContainer } from './LayoutConfigContainer';
import { LayoutSwitch } from './LayoutSwitch';
import { ToolbarButton } from './ToolbarButton';
import { DeviceSize, Layout } from './ValueObject';
import { ViewportSwitch } from './ViewportSwitch';

/**
 * ストーリーを表示するページコンポーネントです。
 */
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

  const [deviceSizeValue, setDeviceSizeValue] = useState<DeviceSize>(DeviceSize.unset);

  return (
    <>
      <DocumentTitle title={[...storyKeys].reverse().join(' | ')} baseTitle="Catalog | Learn React" />

      <div className={styleBase}>
        <header className={styleHeader}>
          <h1 className={styleTitle}>{`@learn-react/${storyKeys.join('/')}`}</h1>

          <div className={styleControls}>
            <ViewportSwitch onChange={setDeviceSizeValue} />
            <a
              href={`/preview.html?storyId=${storyId}`}
              id={outerLinkId}
              className={styleOuterLink}
              target="_blank"
              rel="noreferrer"
            >
              <ToolbarButton noop>
                <Icon name="open-window" />
              </ToolbarButton>
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
            <div className={cx(styleViewport, Object.values(deviceSizeValue).every(nonNull) && styleViewportChanged)}>
              <iframe
                // story page 切替時に前回の preview が一瞬だが残ってしまうのを回避するために
                // 強制的に再マウントしてゼロからレンダリングさせている。
                key={storyId}
                src={`/preview.html?storyId=${storyId}`}
                title={[...storyKeys].reverse().join(' | ')}
                style={deviceSizeValue}
                // oxlint-disable-next-line iframe-missing-sandbox
                sandbox="allow-scripts allow-same-origin allow-popups-to-escape-sandbox allow-forms"
              />
            </div>

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
  display: grid;
  grid-template-columns: 1fr auto;
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
  gap: ${gutter(2)};
`;

const styleOuterLink = css`
  display: inline-flex;
`;

const styleBody = css`
  overflow: hidden;
`;

const styleViewport = css`
  width: 100%;
  height: 100%;

  > iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    box-shadow: ${cssVar('ShadowDialog')};
    transition:
      width ${Duration.Fade} ${Easing.Enter},
      height ${Duration.Fade} ${Easing.Enter};
  }
`;

const styleViewportChanged = css`
  padding: ${gutter(4)};
  overflow: auto;
  background-color: ${cssVar('TextureBackdrop')};
  background-image:
    linear-gradient(rgb(128 128 128 / 10%) 2px, transparent 2px),
    linear-gradient(90deg, rgb(128 128 128 / 10%) 2px, transparent 2px),
    linear-gradient(rgb(128 128 128 / 10%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(128 128 128 / 10%) 1px, transparent 1px);
  background-position:
    -2px -2px,
    -2px -2px,
    -1px -1px,
    -1px -1px;
  background-size:
    100px 100px,
    100px 100px,
    20px 20px,
    20px 20px;
`;

const styleCodeBlock = css`
  height: 100%;
  background-color: #282c34;
`;

const styleCodeBlockBody = css`
  height: 100%;
  overflow: auto;
`;
