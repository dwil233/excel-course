import {Page} from '@core/Page';
import {$} from '@core/Dom';
import {getExcelFilesList} from '@/pages/dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db').html(`
        <div class="dashboard__header">
            <h1>Excel Dashboard</h1>
        </div>
        <div class="dashboard__new">
            <div class="dashboard__view">
                <a href="#excel/${now}" class="dashboard__create">Новая таблица</a>
            </div>
        </div>
        <div class="dashboard__table dashboard__view">
            <div class="dashboard__list-header">
                <span>Название таблицы</span>
                <span>Дата открытия</span>
            </div>
            <ul class="dashboard__list">
               ${getExcelFilesList()}
            </ul>
        </div>
    `)
  }
}
