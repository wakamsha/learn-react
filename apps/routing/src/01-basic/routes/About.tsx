import { Link } from 'react-router';

export const About = () => (
  <div>
    <h1>About</h1>

    <p>This is a simple example of how to use React Router.</p>

    <Link viewTransition to="/">
      ← Go to Top
    </Link>
  </div>
);
