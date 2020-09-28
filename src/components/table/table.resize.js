import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $resizable = $resizer.closest('[data-type="resizable"]')
  const coords = $resizable.getCoords()
  const type = $resizer.data.resize
  let value

  event.preventDefault()
  event.stopPropagation()
  $resizer.css({opacity: 1})

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px',
        bottom: -5000 + 'px',
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px',
        right: -5000 + 'px',
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $root.findAll(`[data-col="${$resizable.data.col}"]`)
          .forEach( el => el.style.width = value + 'px')
    } else {
      $resizable.css({height: value + 'px'})
    }
    $resizer.css({
      right: 0,
      bottom: 0,
      opacity: null,
    })
  }
}
