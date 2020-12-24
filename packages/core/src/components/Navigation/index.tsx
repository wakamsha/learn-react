import { css, cx } from 'emotion';
import { CSSProperties, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Color, Duration, FontSize } from '../../constants/Style';
import { gutter } from '../../helpers/Style';

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

export const Navigation = ({ title, items, width = 272 }: Props) => {
  const location = useLocation();

  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <nav className={baseStyle} style={{ width }}>
      <header className={mastheadStyle}>
        <h1 className={titleStyle}>
          <Link to="/">{title}</Link>
        </h1>
      </header>
      <div className={bodyStyle}>
        <ul className={navigationStyle}>
          {items.map((item, i) => (
            <li key={i} className={cx(itemStyle, item.to === pathname && itemSelectedStyle)}>
              {item.to ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <>
                  {item.label}
                  <ul className={navigationStyle}>
                    {item.items?.map(({ label, to }, j) => (
                      <li key={j} className={cx(itemStyle, to === pathname && itemSelectedStyle)}>
                        <Link to={to}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const baseStyle = css`
  flex-shrink: 0;
  height: 100vh;
  background: ${Color.TextureBody};
  border-right: 1px solid ${Color.LineLighter};
`;

const mastheadStyle = css`
  flex-shrink: 0;
  padding: ${gutter(3)} ${gutter(4)} ${gutter(4)};
`;

const titleStyle = css`
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

const bodyStyle = css`
  flex-grow: 1;
  padding: 0 ${gutter(4)} ${gutter(10)};
  overflow-y: auto;
`;

const navigationStyle = css`
  padding: 0;
  margin: 0;
  font-size: ${FontSize.Regular};
  list-style: none;

  & & {
    padding-left: ${gutter(4)};
    margin-top: ${gutter(2)};
  }
`;

const itemStyle = css`
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
`;

const itemSelectedStyle = css`
  > a {
    font-weight: bold;
    color: ${Color.ThemePrimary};
    pointer-events: none;
  }
`;
