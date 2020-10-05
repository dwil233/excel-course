export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // subscribers notification method
  fire(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // add new listener
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => {
      this.listeners[eventName] =
        this.listeners[eventName].filter(listener => listener !== fn)
    }
  }
}
//
// const emitter = new Emitter()
// const unsubscribe = emitter.subscribe('SomeEvent', arg => console.log('argument:', arg))
// emitter.fire('SomeEvent', 'an argument')
//
// setTimeout(() => {
//   emitter.fire('SomeEvent', 'Fired after 1 sec')
// }, 1000)
// setTimeout(() => {
//   unsubscribe()
// }, 2000)
// setTimeout(() => {
//   emitter.fire('SomeEvent', 'Fired after 3 sec')
// }, 3000)
