const CODES = {
  A: 65,
  Z: 90,
}

function createRow(info, data) {
  const resizer = info ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
   <div class="row" data-type="resizable" ${(info) ? 'data-row="' + info + '"' : ''}">
     <div class="row-info">
        ${info}
        ${resizer}
     </div>
     <div class="row-data">${data}</div>
   </div>`
}

function createCol(content) {
  return `
    <div class="column" data-type="resizable" data-col="${content}">
        ${content}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createCell(content, index) {
  return `<div class="cell" contenteditable="true" data-col="${toChar(null, index)}" data-row="${content}"></div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(createCol)
      .join('')
  rows.push(createRow('', cols))
  for (let i=1; i<=rowsCount; i++) {
    const cells = new Array(colsCount).fill(i)
        .map(createCell)
        .join('')

    rows.push(createRow(i, cells))
  }
  return rows.join('')
}
