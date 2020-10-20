export function enteringDone(event) {
  const keys = ['Enter', 'Tab']
  if (keys.includes(event.key)) {
    // eslint-disable-next-line
    this.$fire('entering:done', event)
  }
}
