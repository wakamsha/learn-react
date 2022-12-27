import { DocumentTitle } from '@learn-react/core/components/utils/DocumentTitle';
import { BorderRadius, FontFamily, FontSize } from '@learn-react/core/constants/Style';
import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import type { FC } from 'react';
import { useMemo } from 'react';
import { stories } from '../constants/Stories';

export const Preview = () => {
  const storyId = getParam('storyId');

  const storyParams = storyId.split('__');

  const { Component } = useMemo(() => {
    let snapShot: any = stories;

    for (let i = 0; i < storyParams.length; i++) {
      if (!snapShot[storyParams[i]]) {
        break;
      }
      snapShot = snapShot[storyParams[i]];
    }

    return snapShot as { Component: FC };
  }, [storyParams]);

  return (
    <>
      <DocumentTitle title={storyParams.slice().reverse().join(' | ')} baseTitle="Catalog | Learn React" />

      <article className={stylePreview}>
        <Component />
      </article>
    </>
  );
};

const stylePreview = css`
  padding: ${gutter(4)} ${gutter(6)};

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

function getParam(name: string) {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get(name) ?? '';
}
