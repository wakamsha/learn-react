import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { Link } from 'react-router-dom';
import { Router } from '../constants/Router';

/**
 * ページリンク一覧を列挙します。
 */
export const Navigation = () => (
  <ul className={styleBase}>
    <li>
      <Link to={Router.Home}>Home</Link>
    </li>
    <li>
      <Link to={Router.Expenses}>Expenses</Link>
    </li>
    <li>
      <Link to={Router.Invoices}>Invoices</Link>
    </li>
    <li>
      <Link to={Router.Friends}>Friends</Link>
    </li>
  </ul>
);

const styleBase = css`
  height: 100dvh;
  padding: ${gutter(4)} 0;
  margin: 0;
  list-style: none;
  background-color: ${cssVar('TextureBody')};
  border-left: 1px solid ${cssVar('LineNeutral')};

  > :not(:first-child) {
    margin-top: ${gutter(2)};
  }

  a {
    display: block;
    padding: 0 ${gutter(4)};
  }
`;
