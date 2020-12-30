import { css, cx } from '@emotion/css';
import { CSSProperties, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BorderRadius, Color, Duration, FontSize } from '../../constants/Style';
import { gutter, square } from '../../helpers/Style';
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
  width?: CSSProperties['width'];
};

export const Navigation = ({ title, width = 272, items }: Props) => {
  const location = useLocation();

  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <div role="complementary" className={styleBase} style={{ width }}>
      <header className={styleMasthead}>
        <img src={Logo} alt="React Logo" className={styleLogo} />
        <h1 className={styleTitle}>
          <Link to="/">{title}</Link>
        </h1>
      </header>
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
                    {item.items?.map(({ label, to }, j) => (
                      <li key={j} className={styleItem} role="treeitem" aria-selected={to === pathname}>
                        <Link to={to}>{label}</Link>
                      </li>
                    ))}
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
  flex-shrink: 0;
  height: 100vh;
  overflow-y: auto;
  background: ${Color.TextureBody};
  border-right: 1px solid ${Color.LineLighter};
`;

const styleMasthead = css`
  flex-shrink: 0;
  padding: ${gutter(3)} ${gutter(4)};

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

const styleBody = css`
  flex-grow: 1;
  padding: 0 ${gutter(4)} ${gutter(10)};
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
    padding: ${gutter(1)} 0;
    color: ${Color.TextNeutral};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &[aria-selected='true'] {
    > a {
      font-weight: bold;
      color: ${Color.ThemeDangerNeutral};
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
