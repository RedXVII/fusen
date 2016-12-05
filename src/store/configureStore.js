import rootReducer from '../reducers';
import { createStore, compose } from 'redux';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  DevTools.instrument()
);

export default (initialState = {}) => {
  return createStore(rootReducer, initialState, enhancer);
};
