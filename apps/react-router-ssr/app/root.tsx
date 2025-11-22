import type { FC, ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from 'react-router';
import type { Route } from './+types/root';
import appStylesHref from './app.css?url';
import { LoadingSplash } from './components/LoadingSplash';
import { ErrorPage } from './templates/ErrorPage';

/**
 * Renders the app.
 */
export default () => <Outlet />;

type LayoutProps = {
  children: ReactNode;
};

/**
 * Layout for the app.
 *
 * The Layout component is a special export for the root route.
 * It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
 * For more information, see https://reactrouter.com/explanation/special-files#layout-export
 */
export const Layout: FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href={appStylesHref} />
      <Links />
      <Meta />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

/**
 * Error boundary for the app.
 *
 * The top most error boundary for the app, rendered when your app throws an error
 * For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
 */
export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return <ErrorPage message={message} details={details} stack={stack} />;
};

/**
 * Fallback UI for hydration.
 */
export const HydrateFallback = () => <LoadingSplash />;
