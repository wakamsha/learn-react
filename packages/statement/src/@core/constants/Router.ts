export const Router = {
  paths: {
    home: '/',
    profile: 'profile',
    profileEdit: 'edit/',
    profileShow: 'show/',
    profileFoo: 'foo/',
    list: 'list',
  },
} as const;

export type Paths = ValueOf<typeof Router.paths>;
