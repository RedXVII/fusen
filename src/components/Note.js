import React from 'react';
import './Note.css'

const Note = ({id, x, y, width, height, text, onClick}) => {
  const style = {
    left: x,
    top: y,
    width: width,
    height: height,
  };
  return (
    <div className="note-box" style={style} onClick={() => onClick(id)} >
      <font size="5">
        {text}
      </font>
    </div>
  );
}

export default Note;
