export const Router = {
  Home: '/',
  Stones: {
    To: '/stones',
    Path: '/stones/*',
  },
  StonesMember: {
    To: '/stones/:id',
    Path: '/:id',
  },
} as const;
