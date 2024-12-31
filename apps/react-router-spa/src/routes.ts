import type { RouteConfig } from '@react-router/dev/routes';
// eslint-disable-next-line import/no-extraneous-dependencies
import { index, layout, route } from '@react-router/dev/routes';

export default [
  layout('layouts/WithSidebar/route.tsx', [
    index('routes/home/route.tsx'),
    route('/new', 'routes/new/route.tsx'),
    route('/contacts/:contactId', 'routes/contacts/$contactId/route.tsx'),
    route('/contacts/:contactId/edit', 'routes/contacts/edit/route.tsx'),
    route('/contacts/:contactId/destroy', 'routes/contacts/destroy/route.tsx'),
  ]),
  route('/about', 'routes/about/route.tsx'),
] satisfies RouteConfig;
