import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import { Link } from 'react-router-dom';

export const Navigation = () => (
  <ul className={styleBase}>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/stones">Stones</Link>
    </li>
  </ul>
);

const styleBase = css`
  height: 100vh;
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
