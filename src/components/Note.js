import React from 'react';
import './Note.css'

class Note extends React.Component {

  render() {
    const x = this.props.x;
    const y = this.props.y;
    const width = this.props.width;
    const height = this.props.height;
    const style = {
      left: x,
      top: y,
      width: width,
      height: height,
    };
    return (
      <div className="note-box" style={style} onClick={() => this.props.onClick(this.props.id)} >
        <font size="5">
          {this.props.text}
        </font>
      </div>
    );
  }
}

export default Note;
