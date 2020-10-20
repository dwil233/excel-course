import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE} from '@/redux/types';

export function rootReducer(state, action) {
  let field
  let value
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: getValue(state, field, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {...state, currentText: action.data.value, dataState: getValue(state, field, action)}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      value = state[field] || {}
      action.data.ids.forEach(id => value[id]={...value[id], ...action.data.value})
      return {...state,
        [field]: value,
        currentStyles: {...state.currentStyles, ...action.data.value},
      }
    case CHANGE_TITLE:
      return {...state, title: action.data}
    case UPDATE_DATE:
      return {...state, updateDate: new Date().toJSON()}
    default: return state
  }
}

function getValue(state, field, action) {
  // const prevState = state[field] || {}
  const prevState = state[field] ? {...state[field]} : {}
  prevState[action.data.id] = action.data.value
  return prevState
}
