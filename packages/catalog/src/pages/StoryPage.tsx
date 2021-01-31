import { css } from '@emotion/css';
import { BorderRadius, Color, FontFamily, FontSize, LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Category, Components, Constants, Hooks } from '../Stories';

export const StoryPage = () => {
  const { category, story } = useParams<{ category: Category; story: string }>();

  const Component = useMemo(() => {
    const section: Frozen<Category, any> = {
      components: Components,
      constants: Constants,
      hooks: Hooks,
    } as const;

    return section[category][story];
  }, [category, story]);

  return (
    <div className={styleBase}>
      <section className={stylePreview}>
        <header className={styleHeader}>
          <small>{`@learn-react/core/${category}`}</small>
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
    font-size: ${FontSize.Small};
    color: ${Color.TextSub};
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
