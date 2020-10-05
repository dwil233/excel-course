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
  const col = toChar(null, index)
  return `<div class="cell" contenteditable="true" 
            data-col="${col}" 
            data-id="${index+1}:${content}">
          </div>`
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
  for (let row=1; row<=rowsCount; row++) {
    const cells = new Array(colsCount).fill(row)
        .map(createCell)
        .join('')

    rows.push(createRow(row, cells))
  }
  return rows.join('')
}
