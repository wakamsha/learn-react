import { Link } from 'react-router-dom';
import { NavigationStyle as Style } from '../../@core/constants/Style';

export const Navigation = () => (
  <nav className={Style.Base}>
    <h1 className={Style.Title}>History API</h1>
    <ul className={Style.Navigation}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
);
