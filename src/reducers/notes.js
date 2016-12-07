import * as types from '../actions/actionTypes';
import update from 'immutability-helper';

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
// eslint-disable-next-line
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

function setNoteText(notes, noteId, newText) {
  var noteIndex = notes.findIndex(function(note) {
      return note.id === noteId;
  });

  var updatedNote = update(notes[noteIndex], {text: {$set: newText}});

  var newNotes = update(notes, {
      $splice: [[noteIndex, 1, updatedNote]]
  });
  return newNotes;
}

function transformNote(notes, noteId, x, y, width, height) {
  var noteIndex = notes.findIndex(function(note) {
      return note.id === noteId;
  });
  var updatedNote = update(notes[noteIndex], {
    x: {$set: x},
    y: {$set: y},
    width: {$set: width},
    height: {$set: height}
  });

  var newNotes = update(notes, {
      $splice: [[noteIndex, 1, updatedNote]]
  });
  return newNotes;
}


const notes = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_NOTE:
      let newId = generateUUID();
      return {...state, notes: [...state.notes, {...action.note, id:newId}]};
    case types.TRANSFORM_NOTE:
      return {...state, notes: transformNote(state.notes, action.noteId, action.x, action.y, action.width, action.height)};
    case types.SET_NOTE_TEXT:
      return {...state, notes: setNoteText(state.notes, action.noteId, action.text)};
    case types.SET_SELECTED_NOTE:
      return {...state, selectedNoteId: action.noteId};
    default:
      return state;
  }
}

export default notes
