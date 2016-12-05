import React from 'react';
import Note from './Note';
import NoteListContainer from '../containers/NoteListContainer';

import './Picture.css';

// put constant in another file
const MINIMAL_NOTE_SIZE = 20;

class Picture extends React.Component {

  constructor() {
    super();

    this.state = {
      isDrawing: false,
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  computeRectangle(x1, y1, x2, y2) {
    return {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x1 - x2),
      height:Math.abs(y1 - y2)
    };
  }

  handleMouseDown(e) {
    this.setState({
      startX: e.nativeEvent.offsetX,
      startY: e.nativeEvent.offsetY,
      currentX: e.nativeEvent.offsetX,
      currentY: e.nativeEvent.offsetY,
      isDrawing: true
    });
  }

  handleMouseMove(e) {
    if (!this.state.isDrawing) return;

    if (e.buttons === 0)
    {
      this.setState({isDrawing: false});
      this.sendNewNote(this.state.startX, this.state.startY, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
    else
    {
      this.setState({
        currentX: e.nativeEvent.offsetX,
        currentY: e.nativeEvent.offsetY,
      });
    }
  }
  sendNewNote(startX, startY, currentX, currentY) {
    let newNoteData = this.computeRectangle(startX, startY, currentX, currentY);
    if (newNoteData.width > MINIMAL_NOTE_SIZE && newNoteData.height > MINIMAL_NOTE_SIZE)
    {
      this.props.onNewNote(newNoteData);
    }
  }


  render() {
    let tmpNoteData = this.state.isDrawing ? this.computeRectangle(this.state.startX, this.state.startY, this.state.currentX, this.state.currentY) : null;
    return (
      <div className="picture" >
        <img role="presentation" draggable="false" src={this.props.imageUrl} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} />
        <NoteListContainer/>
        {tmpNoteData != null && <Note {...tmpNoteData} />}
      </div>
    );
  }
}

export default Picture;
