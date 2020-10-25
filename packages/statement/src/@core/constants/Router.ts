export const Router = {
  paths: {
    home: '/',
    profile: '/profile/',
    profileEdit: '/profile/edit/',
    profileShow: '/profile/show/',
    profileFoo: '/profile/foo/',
    list: '/list/',
  },
} as const;

export type Paths = ValueOf<typeof Router.paths>;
