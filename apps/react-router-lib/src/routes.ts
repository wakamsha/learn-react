/**
 * The paths used in the application.
 */
export const Paths = {
  Home: '/',

  About: '/about',

  New: '/new',

  Contacts: {
    Contact: '/contacts/:contactId',
    Edit: '/contacts/:contactId/edit',
    Destroy: '/contacts/:contactId/destroy',
  },
} as const;
