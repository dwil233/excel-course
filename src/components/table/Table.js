import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, nextSelector, shouldResize} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import {$} from '@core/Dom';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['currentText'],
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
    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', (event) => {
      event.preventDefault()
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.selected.forEach(element => {
        element.css(value)
      })
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }))
    })
  }

  toHTML() {
    return createTable(100, this.store.getState())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$fire('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: value,
    }))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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
    if (keys.includes(event.key)) {
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(event, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
