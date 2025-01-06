import { type ReactNode } from 'react';
import './app.css';

type Props = {
  children: ReactNode;
};

/**
 * Layout for the app.
 *
 * The Layout component is a special export for the root route.
 */
export default ({ children }: Props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>{children}</body>
  </html>
);
