import { Link } from 'react-router';
import { routes } from '../routes';

export const About = () => (
  <div>
    <h1>About</h1>

    <p>This is a simple example of how to use React Router.</p>

    <Link viewTransition to={routes.Home.To}>
      ← Go to Top
    </Link>
  </div>
);
