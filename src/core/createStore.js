export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let subscribers = []

  return {
    subscribe(fn) {
      subscribers.push(fn)
      return {
        unsubscribe() {
          subscribers = subscribers.filter(sr => sr !== fn)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(subscriber => subscriber(state))
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}

