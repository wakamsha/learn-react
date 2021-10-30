import { css, cx } from '@emotion/css';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BorderRadius, Duration, FontSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';
import { TextField } from '../../inputs/TextField';
import Logo from './logo192.png';

type Item = {
  label: string;
} & XOR<
  {
    to: string;
  },
  {
    items: {
      label: string;
      to: string;
    }[];
  }
>;

type Props = {
  title: string;
  items: Item[];
  width?: number;
};

export const Sidebar = ({ title, width = 272, items }: Props) => {
  const location = useLocation();

  const [pathname, setPathname] = useState(location.pathname);

  const [keyword, setKeyword] = useState('');

  const flattenLabels = useMemo(() => {
    const pattern = keyword.replace(/\\|\*|\+|\.|\?|\{|\}|\(|\)|\[|\]|\^|\$|\||\//g, replace => `\\${replace}`).trim();
    const query = new RegExp(pattern, 'i');

    return items
      .reduce((acc: (string | string[])[], item) => [...acc, item.items?.map(({ label }) => label) ?? item.label], [])
      .flat()
      .filter(label => label.match(query));
  }, [items, keyword]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <div role="complementary" className={styleBase} style={{ width, gridAutoColumns: `calc(${width}px - 1px)` }}>
      <header className={styleMasthead}>
        <img src={Logo} alt="React Logo" className={styleLogo} />
        <h1 className={styleTitle}>
          <Link to="/">{title}</Link>
        </h1>
      </header>

      <div role="form" className={styleForm}>
        <TextField
          name="search"
          type="search"
          placeholder="Search..."
          value={keyword}
          onChange={setKeyword}
          clearable
        />
      </div>

      <nav className={styleBody}>
        <ul className={styleNavigation} role="tree">
          {items?.map((item, i) => (
            <li
              key={i}
              className={cx(styleItem, !item.to && styleItemCaption)}
              role="treeitem"
              aria-selected={item.to === pathname}
            >
              {item.to ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <>
                  <span>{item.label}</span>
                  <ul className={styleNavigation} role="tree">
                    {item.items?.map(({ label, to }, j) =>
                      flattenLabels.includes(label) ? (
                        <li key={j} className={styleItem} role="treeitem" aria-selected={to === pathname}>
                          <Link to={to}>{label}</Link>
                        </li>
                      ) : null,
                    )}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
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
  background-color: ${cssVar('TextureBody')};
  border-right: 1px solid ${cssVar('LineNeutral')};
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
  background-color: ${cssVar('ThemePrimaryDarker')};
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

  & & {
    padding-left: ${gutter(4)};
    margin-top: ${gutter(2)};
  }
`;

const styleItem = css`
  margin-bottom: ${gutter(2)};

  > a {
    display: block;
    padding: 0;
    color: ${cssVar('TextNeutral')};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &[aria-selected='true'] {
    > a {
      font-weight: bold;
      color: ${cssVar('ThemeDangerNeutral')};
      pointer-events: none;
    }
  }
`;

const styleItemCaption = css`
  margin-bottom: ${gutter(4)};

  > span {
    font-weight: bold;
    text-transform: uppercase;
  }
`;
