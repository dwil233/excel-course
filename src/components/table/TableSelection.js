import {range} from '@/components/table/table.functions';

export class TableSelection {
  static className = 'selected'

  constructor() {
    this.selected = []
    this.current = null
  }

  select($el) {
    this.clearAll()
    this.selected.push($el)
    $el.addClass(TableSelection.className).focus()
    this.current = $el
    return $el
  }

  selectGroup($toCell, $root) {
    if (this.current.id() === $toCell.id()) return

    const current = this.current.id(true)
    const target = $toCell.id(true)

    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    this.selected = cols.reduce((acc, col) => {
      rows.forEach(row => {
        const $cell = $root.find(`[data-id="${col}:${row}"]`)
        acc.push($cell)
        $cell.addClass(TableSelection.className)
      })
      return acc
    }, [])
    window.selected = this.selected
  }

  get selectedIds() {
    return this.selected.map($el => $el.id())
  }

  clearAll() {
    this.selected.forEach($el => $el.removeClass(TableSelection.className))
    this.selected = []
  }
}
