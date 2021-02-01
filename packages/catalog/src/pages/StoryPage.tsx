import { css } from '@emotion/css';
import { BorderRadius, Color, FontFamily, FontSize, LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { stories } from '../Stories';

type Params = {
  story: string;
  subPackage: string;
  type: string;
  category?: string;
};

export const StoryPage = () => {
  const { story, subPackage, type, category = '' } = useParams<Params>();

  const Component = useMemo(
    () => (category !== '-' ? (stories as any)[subPackage][type][category][story] : stories[subPackage][type][story]),
    [story, subPackage, type, category],
  );

  return (
    <div className={styleBase}>
      <section className={stylePreview}>
        <header className={styleHeader}>
          <small>{`@learn-react/${subPackage}/${type}/${category ? `${category}/` : ''}`}</small>
          <h1>{story}</h1>
        </header>
        <Component />
      </section>
    </div>
  );
};

const styleBase = css`
  display: grid;
  height: 100vh;
  color: ${Color.TextNeutral};
  background: #f6f6f8;
`;

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
