import {toInlineStyles} from '@core/utils';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createRow(state, info, data) {
  const resizer = info ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state.rowState, info)
  return `
   <div class="row" data-type="resizable" ${(info) ? 'data-row="' + info + '"' : ''} style="height: ${height}"">
     <div class="row-info">
        ${info}
        ${resizer}
     </div>
     <div class="row-data">${data}</div>
   </div>`
}

function createCol({content, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${content}" style="width: ${width}">
        ${content}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createCell(state, row) {
  return function(_, index) {
    const col = toChar(_, index)
    const width = getWidth(state.colState, col)
    const id = `${index+1}:${row}`
    const styles = toInlineStyles(state.stylesState[id])
    const data = state.dataState[id] || ''
    return `<div class="cell" contenteditable="true" 
              data-col="${col}" 
              data-id="${id}"
              data-value="${data}"
              style="${styles}; width:${width}">
              ${parse(data)}
            </div>`
  }
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function addWidth(state) {
  return function(content, index) {
    return {content, index, width: getWidth(state, content)}
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(addWidth(state.colState))
      .map(createCol)
      .join('')
  rows.push(createRow(state, '', cols))
  for (let row=1; row<=rowsCount; row++) {
    const cells = new Array(colsCount).fill('')
        .map(createCell(state, row))
        .join('')

    rows.push(createRow(state, row, cells))
  }
  return rows.join('')
}
