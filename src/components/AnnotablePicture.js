import React from 'react';
import {connect} from 'react-redux';
import NoteEditor from './NoteEditor'
import Picture from './Picture'
import './AnnotablePicture.css';

import { addNote, setNoteText } from '../actions/noteActions';

const AnnotablePicture = ({pictureUrl, selectedNote, handleNewNote, handleNoteTextChange}) => (
  <div className="annotated-picture" >
    <Picture imageUrl={pictureUrl} onNewNote={handleNewNote} >
    </Picture>
    {selectedNote != null && <NoteEditor noteId={selectedNote.id} text={selectedNote.text || ''} onUserInput={handleNoteTextChange} />}
  </div>
);

const getSelectedNote = (notes) => {
  return notes.notes.find((note) => note.id === notes.selectedNoteId);
}

const mapStateToProps = (state) => {
   return {
     pictureUrl: state.picture,
     selectedNote: getSelectedNote(state.notes)
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      handleNewNote: (noteData) => dispatch(addNote(noteData)),
      handleNoteTextChange: (noteId, newText) => dispatch(setNoteText(noteId, newText))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnotablePicture);
