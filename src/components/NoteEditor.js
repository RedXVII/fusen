import React from 'react';
import './NoteEditor.css';

class NoteEditor extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onUserInput(this.props.noteId, e.target.value);
  }

  render() {
    return (
      <div className="note-editor">
        <textarea onChange={this.handleChange} value={this.props.text}/>
      </div>
    );
  }
}

export default NoteEditor;
