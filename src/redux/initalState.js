import {storage} from '@core/utils';
import {defaultTitle, defaultStyles} from '@/constants';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  stylesState: {},
  currentStyles: defaultStyles,
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState
