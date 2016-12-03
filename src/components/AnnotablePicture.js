import React from 'react';
import Note from './Note'
import NoteEditor from './NoteEditor'
import Picture from './Picture'
import './AnnotablePicture.css';

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

const EXAMPLE_DATA = {
  pictureUrl: "http://res.cloudinary.com/dex67pc5x/image/upload/v1480412158/bXonQgc_dgjo24.png",
  notes: [{
    id: 1,
    x: 445,
    y: 30,
    height: 450,
    width: 100,
    text: "I'm very disappointed in you all!!"
  }]
};

class AnnotablePicture extends React.Component {
  constructor() {
    super();
    this.state = {
      pictureUrl: null,
      notes: [],
      selectedNoteId: null,
    };


    this.handleNewNote = this.handleNewNote.bind(this);
    this.handleNoteSelected = this.handleNoteSelected.bind(this);
    this.handleNoteTextChange = this.handleNoteTextChange.bind(this);

  }

  componentDidMount() {
    // load data from farAway!
    this.setState(EXAMPLE_DATA);

  }

  handleNoteSelected(noteId) {
    console.debug("note selected : " + noteId);

    this.setState({selectedNoteId: noteId});
  }

  handleNewNote(rectangleData) {
    let notes = this.state.notes.slice();
    rectangleData.id = generateUUID();
    notes.push(rectangleData);
    this.setState({notes: notes});
  }

  handleNoteTextChange(noteId, newText) {
    var notes = this.state.notes;

    var noteIndex = notes.findIndex(function(note) {
        return note.id === noteId;
    });

    var updatedNote = update(notes[noteIndex], {text: {$set: newText}});

    var newNotes = update(notes, {
        $splice: [[noteIndex, 1, updatedNote]]
    });
    this.setState({notes: newNotes});
  }

  render() {
    const notes = [];
    let selectedNoteData = null;
    this.state.notes.forEach((noteData) => {
      let isSeletedNote = noteData.id === this.state.selectedNoteId;
      if (isSeletedNote) selectedNoteData = noteData;
      notes.push(<Note key={noteData.id} selected={isSeletedNote} onClick={this.handleNoteSelected} {...noteData} />);
    });

    return (
      <div className="annotated-picture" >
        <Picture imageUrl={this.state.pictureUrl} onNewNote={this.handleNewNote} >
          {notes}
        </Picture>
        {selectedNoteData != null && <NoteEditor noteId={selectedNoteData.id} text={selectedNoteData.text || ''} onUserInput={this.handleNoteTextChange} />}
      </div>
    );
  }
}

export default AnnotablePicture;
