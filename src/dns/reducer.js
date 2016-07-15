import genReducer from 'nsk-reducer';
import actions, { actionTypes } from './actions';

import Immutable from 'immutable';
const Imm = Immutable, ImmMap = Immutable.Map;

const defaultState = Imm.fromJS({
  model: [],
  ui: {
    entriesVisible: true
  }
});

const handlers = ImmMap({
  [actionTypes.LOAD_DNS_FULFILLED]: (state, action) => {
    return state.set('model', Imm.fromJS(action.payload));
  },
  [actionTypes.TOGGLE_VISIBLE]: (state, action) => {
    const entriesPath = ['ui', 'entriesVisible'];
    const newFilter = !state.getIn(entriesPath);
    return state.setIn(entriesPath, newFilter);
  }
});

export default genReducer(defaultState, handlers);
