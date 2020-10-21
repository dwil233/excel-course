import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {getInitialState} from '@/redux/initalState';

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const state = storage(storageName(this.params))
    const store = createStore(rootReducer, getInitialState(state))

    const stateListener = debounce(state => {
      storage('excel:' + this.params, state)
    }, 500)

    store.subscribe(stateListener)

    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
