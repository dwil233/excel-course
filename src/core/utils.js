export function capitalize(strToCap) {
  if (typeof strToCap !== 'string') {
    throw new Error(`String to capitalize has to be string but it's $(typeof strToCap)`)
  }
  return strToCap[0].toUpperCase() + strToCap.substr(1)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export function isEqual(prev, curr) {
  if (typeof prev === 'object' && typeof curr === 'object') {
    return JSON.stringify(prev) === JSON.stringify(curr)
  }
  return prev === curr
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, timeToWait) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout( () => {
      // eslint-disable-next-line
      fn.apply(this, args)
    }, timeToWait)
  }
}

