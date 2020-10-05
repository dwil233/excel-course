export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.id
}

export function nextSelector(event, {col, row}) {
  const MIN_VALUE = 1

  switch (event.key) {
    case 'Tab':
      event.preventDefault()
      if (event.shiftKey) {
        col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      } else {
        col++
      }
      break
    case 'ArrowRight':
      col++
      break
    case 'Enter':
      if (!event.shiftKey) {
        event.preventDefault()
        row++
      }
      break
    case 'ArrowDown':
      row++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }
  return `[data-id="${col}:${row}"]`
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return Array.from({length: end - start + 1}, (_, i) => start + i)
}
