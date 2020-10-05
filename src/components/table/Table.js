import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, nextSelector, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="1:1"]')
    this.selectCell($cell)
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', (event) => {
      event.preventDefault()
      this.selection.current.focus()
    })
  }

  toHTML() {
    return createTable(100)
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$fire('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
    if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        this.selection.selectGroup($cell, this.$root)
      } else {
        this.selectCell($cell)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Tab', 'ArrowRight', 'Enter', 'ArrowDown', 'ArrowLeft', 'ArrowUp']
    // const editKeys = ['Tab', 'Enter']
    if (keys.includes(event.key)) {
      // if (!editKeys.includes(event.key) && this.selection.current.text) return

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(event, id))
      this.selectCell($next)
    }
  }

  onInput() {
    this.$fire('table:select', this.selection.current)
  }
}
