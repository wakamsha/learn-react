import { css } from '@emotion/css';
import { Icon } from '@learn-react/core/components/dataDisplay/Icon';
import { TextField } from '@learn-react/core/components/inputs/TextField';
import { BorderRadius, Color, Duration, FontFamily, FontSize, IconSize } from '@learn-react/core/constants/Style';
import { gutter, square } from '@learn-react/core/helpers/Style';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { stories } from '../../Stories';
import Logo from './logo192.png';

type Props = {
  width?: number;
};

export const Navigation = ({ width = 272 }: Props) => {
  const location = useLocation();

  const [pathname, setPathname] = useState(location.pathname);

  const [keyword, setKeyword] = useState('');

  // const flattenLabels = useMemo(() => {
  //   const pattern = keyword.replace(/\\|\*|\+|\.|\?|\{|\}|\(|\)|\[|\]|\^|\$|\||\//g, replace => `\\${replace}`).trim();
  //   const query = new RegExp(pattern, 'i');

  //   return items
  //     .reduce((acc: (string | string[])[], item) => [...acc, item.items.map(({ label }) => label) ?? item.label], [])
  //     .flat()
  //     .filter(label => label.match(query));
  // }, [items, keyword]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <div role="complementary" className={styleBase} style={{ width, gridAutoColumns: `calc(${width}px - 1px)` }}>
      <header className={styleMasthead}>
        <img src={Logo} alt="React Logo" className={styleLogo} />
        <h1 className={styleTitle}>
          <Link to="/">Catalog | Learn React</Link>
        </h1>
      </header>

      <div role="form" className={styleForm}>
        <TextField type="search" placeholder="Search..." value={keyword} onChange={setKeyword} clearable />
      </div>

      <nav className={styleBody}>
        {Object.entries(stories).map(([subPackageKey, subPackage]) => (
          <ul key={subPackageKey} className={styleNavigation} role="tree">
            <li>
              <div className={styleCaptionSubPackage}>@learn-react/{subPackageKey}</div>
              <ul className={styleTypeList}>
                {Object.entries(subPackage).map(([typeKey, type]) => (
                  <li key={typeKey}>
                    <div className={styleCaptionType}>
                      <Icon name="folder" />
                      {typeKey}
                    </div>
                    <ul className={styleItemList}>
                      {Object.entries(type).map(([key, value]) => (
                        <li key={key}>
                          {typeof value === 'function' ? (
                            <Link
                              to={`/${subPackageKey}/${typeKey}/-/${key}/`}
                              className={styleLink}
                              aria-selected={`/${subPackageKey}/${typeKey}/-/${key}/` === pathname}
                            >
                              {key}
                            </Link>
                          ) : (
                            <>
                              <div className={styleCaptionCategory}>
                                <Icon name="folder" />
                                {key}
                              </div>
                              <ul className={styleStoryList}>
                                {Object.entries(value).map(([storyKey]) => {
                                  const to = `/${subPackageKey}/${typeKey}/${key}/${storyKey}/`;

                                  return (
                                    <li key={storyKey}>
                                      <Link to={to} className={styleLink} aria-selected={to === pathname}>
                                        {storyKey}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
};

const styleBase = css`
  display: grid;
  flex-shrink: 0;
  grid-template-rows: auto auto 1fr;
  grid-gap: ${gutter(4)};
  height: 100vh;
  overflow-y: auto;
  background: ${Color.TextureBody};
  border-right: 1px solid ${Color.LineLighter};
`;

const styleMasthead = css`
  flex-shrink: 0;
  padding: ${gutter(3)} ${gutter(4)} 0;

  > :not(:first-child) {
    margin-top: ${gutter(2)};
  }
`;

const styleLogo = css`
  display: block;
  padding: ${gutter(1)};
  margin: auto;
  background-color: ${Color.ThemePrimaryDarker};
  border-radius: ${BorderRadius.Circle};
  ${square(40)}
`;

const styleTitle = css`
  margin: 0;
  text-align: center;
  background-color: transparent;
  transition: background-color ${Duration.Fade};

  &:hover {
    background-color: #e3e3e7;
  }

  > a {
    display: block;
    padding: ${gutter(1)};
    font-size: ${FontSize.Medium};

    background-image: linear-gradient(-125deg, #0af, #0080ff, #ff00ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const styleForm = css`
  padding: 0 ${gutter(4)};
`;

const styleBody = css`
  flex-grow: 1;
  padding: 0 ${gutter(4)} ${gutter(20)};
  overflow-y: auto;
`;

const styleNavigation = css`
  padding: 0;
  margin: 0;
  font-size: ${FontSize.Regular};
  list-style: none;

  > :not(:first-child) {
    margin-top: ${gutter(8)};
  }
`;

const styleCaptionSubPackage = css`
  display: flex;
  align-items: center;
  margin: 0 0 ${gutter(4)};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;

  &::after {
    flex: 1 0 auto;
    height: 1px;
    margin-left: ${gutter(2)};
    content: '';
    background-color: ${Color.LineDefault};
  }
`;

const styleCaptionType = css`
  display: flex;
  align-items: center;
  margin: 0 0 ${gutter(2)};
  font-weight: bold;

  > svg {
    margin-right: ${gutter(1)};
    ${square(IconSize.Tiny)}
  }
`;

const styleTypeList = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;

const styleCaptionCategory = css`
  font-weight: bold;
  color: ${Color.TextSub};

  > svg {
    margin-right: ${gutter(1)};
    ${square(IconSize.Tiny)}
  }
`;

const styleItemList = css`
  padding-left: ${gutter(4)};

  > :not(:first-child) {
    margin-top: ${gutter(2)};
  }
`;

const styleStoryList = css`
  padding-left: 18px;
`;

const styleLink = css`
  display: block;
  padding: ${gutter(1)} 0;
  font-family: ${FontFamily.Monospace};
  font-size: ${FontSize.Small};

  &[aria-selected='true'] {
    font-weight: bold;
    color: ${Color.ThemeDangerNeutral};
    pointer-events: none;
  }
`;
