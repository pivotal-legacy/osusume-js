export function requireAuth(nextState, replace) {
  if (Object.keys(this.store.getState().currentUser).length == 0) {
    replace({pathname: '/login', state: {}})
  }
}
