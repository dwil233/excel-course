// import {storage} from '@core/utils';
import {defaultTitle, defaultStyles} from '@/constants';

const defaultState = {
  title: defaultTitle,
  updateDate: new Date().toJSON(),
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  stylesState: {},
  currentStyles: defaultStyles,
}

// export const initialState = storage('excel-state') ? storage('excel-state') : defaultState

export function getInitialState(state) {
  return state ? state : defaultState
}
