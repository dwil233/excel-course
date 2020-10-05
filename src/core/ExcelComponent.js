import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }

  prepare() {
  }

  // Возвращает шаблон компонента
  toHTML() {
  }

  init() {
    this.initDOMListeners()
  }

  $fire(eventName, ...args) {
    this.emitter.fire(eventName, ...args)
  }

  $on(eventName, fn) {
    const unsubscriber = this.emitter.subscribe(eventName, fn)
    this.unsubscribers.push(unsubscriber)
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsubscriber => unsubscriber())
  }
}
