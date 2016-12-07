import * as types from './actionTypes';

export const addNote = (note) => {
  return {
    type: types.ADD_NOTE,
    note
  };
}

export const setNoteText = (noteId, text) => {
  return {
    type: types.SET_NOTE_TEXT,
    noteId,
    text
  };
}

export const transformNote = (noteId, x, y, width, height) => {
  return {
    type: types.TRANSFORM_NOTE,
    noteId,
    x,
    y,
    width,
    height
  };
}

export const setSelectedNote = (noteId) => {
  return {
    type: types.SET_SELECTED_NOTE,
    noteId
  };
}
