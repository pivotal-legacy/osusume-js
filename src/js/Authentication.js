export function requireAuth(nextState, replace) {
  if (!this.store.getState().currentUser) {
    replace({pathname: '/login', state: {}})
  }
}
