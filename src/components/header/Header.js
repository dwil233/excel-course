import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/Dom';
import {debounce} from '@core/utils';
import {enteringDone} from '@/components/helpers';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'keydown', 'click'],
      subscribe: ['title'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 500)
  }

  toHTML() {
    const title = this.store.getState().title
    return `<input type="text" class="input" value="${title}" />
            <div>
                <div class="button" data-value="delete">
                    <i class="material-icons" data-value="delete">delete</i>
                </div>
                <div class="button" data-value="exit_to_app">
                    <i class="material-icons" data-value="exit_to_app">exit_to_app</i>
                </div>
            </div>`
  }

  onInput(event) {
    this.$dispatch(actions.changeTitle($(event.target).text()))
  }

  onKeydown(event) {
    enteringDone.call(this, event)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.value === 'delete') {
      const ok = confirm('Delete this document?')
      if (ok) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.value === 'exit_to_app') {
      ActiveRoute.navigate('')
    }
  }
}
