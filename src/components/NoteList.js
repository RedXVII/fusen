import React from 'react';
import Note from './Note';

const NoteList = ({notes, onNoteClick}) => (
  <div>
    {notes.map(noteData =>
      <Note key={noteData.id} onClick={onNoteClick} {...noteData} />
    )}
  </div>
)

export default NoteList;
