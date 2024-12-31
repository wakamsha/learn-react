import type { RouteConfig } from '@react-router/dev/routes';
// eslint-disable-next-line import/no-extraneous-dependencies
import { index, layout, route } from '@react-router/dev/routes';

/**
 * The paths used in the application.
 */
export const Paths = {
  Home: '/',
  About: '/about',
  New: '/new',
  Contacts: {
    Contact: '/contacts/:contactId',
    ContactEdit: '/contacts/:contactId/edit',
    ContactDestroy: '/contacts/:contactId/destroy',
  },
} as const;

export default [
  layout('layouts/WithSidebar/route.tsx', [
    index('routes/home/route.tsx'),
    route(Paths.New, 'routes/new/route.tsx'),
    route(Paths.Contacts.Contact, 'routes/contacts/$contactId/route.tsx'),
    route(Paths.Contacts.ContactEdit, 'routes/contacts/edit/route.tsx'),
    route(Paths.Contacts.ContactDestroy, 'routes/contacts/destroy/route.tsx'),
  ]),
  route(Paths.About, 'routes/about/route.tsx'),
] satisfies RouteConfig;
