export const Router = {
  Home: {
    To: '/',
    Path: '/',
  },
  Stones: {
    To: '/stones',
    Path: '/stones/*',
  },
  StonesMember: {
    To: '/stones/:id',
    Path: '/:id',
  },
} as const;
