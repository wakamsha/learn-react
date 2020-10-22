import { FontSize } from '@learn-react/core/constants/Style';
import { Link } from 'react-router-dom';
import { Paths } from '../../@core/constants/Router';
import { css } from 'emotion';
import { gutter } from '@learn-react/core/helpers/Style';
import React from 'react';

type Item = {
  label: string;
} & XOR<
  {
    to: Paths;
  },
  {
    items: {
      label: string;
      to: Paths;
    }[];
  }
>;

type Props = {
  title: string;
  items: Item[];
};

export const Navigation = ({ title, items }: Props) => (
  <nav className={baseStyle}>
    <h1 className={titleStyle}>{title}</h1>
    <ul className={navigationStyle}>
      {items.map((item, i) => (
        <li key={i}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <>
              {item.label}
              <ul>
                {item.items.map(({ label, to }, j) => (
                  <li key={j}>
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
);

const baseStyle = css`
  flex-shrink: 0;
  height: 100vh;
  padding: ${gutter(4)};
  background: silver;
  border-left: 1px solid gray;
`;

const titleStyle = css`
  padding-bottom: ${gutter(4)};
  margin: 0 0 ${gutter(4)};
  font-size: ${FontSize.Large};
  border-bottom: 1px solid gray;
`;

const navigationStyle = css`
  padding: 0;
  margin: 0;
  list-style: none;

  > li {
    margin-bottom: ${gutter(2)};
  }
`;
