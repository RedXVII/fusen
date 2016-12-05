import {combineReducers} from 'redux';
import notes from './notes';
import picture from './picture';

const rootReducer = combineReducers({
  picture,
  notes
});

export default rootReducer;
