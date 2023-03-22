export const Router = {
  Home: '/',
  Friends: {
    To: '/friends',
    Path: '/friends/*',
  },
  Friend: {
    To: '/friends/:id',
    Path: '/:id',
  },
} as const;
