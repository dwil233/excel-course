import {defaultStyles} from '@/constants';

class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  focus() {
    this.$el.focus()
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        col: +parsed[0],
        row: +parsed[1],
      }
    }
    return this.data.id
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return Array.from(this.$el.querySelectorAll(selector)).map($)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(k => {
      if (styles[k] == null) {
        this.$el.style.removeProperty(k)
      } else {
        this.$el.style[k] = styles[k]
      }
    })
    return this
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s] || defaultStyles[s]
      return res
    }, {})
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes) => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
