import * as types from '../actions/actionTypes';

const picture = (state = '', action) => {
  switch (action.type) {
    case types.SET_PICTURE:
      return action.picture;
    default:
      return state;
  }
}

export default picture
