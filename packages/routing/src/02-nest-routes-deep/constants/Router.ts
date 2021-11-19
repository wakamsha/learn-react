export const Router = {
  Home: {
    To: '/',
    Path: '/',
  },
  Friends: {
    To: '/friends',
    Path: '/friends/*',
  },
  Friend: {
    To: '/friends/:id',
    Path: '/:id',
  },
} as const;
