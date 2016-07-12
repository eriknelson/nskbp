import { combineReducers } from 'redux';
import dnsPod from './dns';

export default combineReducers({
  dns: dnsPod.reducer
});
