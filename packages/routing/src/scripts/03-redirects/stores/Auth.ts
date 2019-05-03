export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: Function) {
    this.isAuthenticated = true;
    setTimeout(cb, 1000);
  },
  signOut(cb: Function) {
    this.isAuthenticated = false;
    setTimeout(cb, 1000);
  },
};
