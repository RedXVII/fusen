import * as types from './actionTypes';

export const setPicture = (picture) => {
  return {
    type: types.SET_PICTURE,
    picture
  };
}
