import React from 'react';
import Note from './Note';

const NoteList = ({notes, onNoteClick, onNoteMove}) => (
  <div>
    {notes.map(noteData =>
      <Note key={noteData.id} onClick={onNoteClick} onMove={onNoteMove} {...noteData} />
    )}
  </div>
)

export default NoteList;
