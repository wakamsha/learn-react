import { DocumentTitle } from '@learn-react/core/components/utils/DocumentTitle';
import type { FC } from 'react';
import { StrictMode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { stories } from './constants/Stories';

const Preview = () => {
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
    <StrictMode>
      <DocumentTitle title={storyParams.slice().reverse().join(' | ')} baseTitle="Catalog | Learn React" />
      <Component />
    </StrictMode>
  );
};

function getParam(name: string) {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get(name) ?? '';
}

const root = createRoot(document.getElementById('preview') as HTMLElement);

root.render(<Preview />);
