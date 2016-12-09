import React from 'react';
import Interactable  from '../helpers/Interactable';
import './Note.css';


class Note extends React.Component {

  defaultState = {
    offsetX: 0,
    offsetY: 0,
    overrideWidth: null,
    overrideHeight: null,
    transform: false
  };

  constructor() {
    super();
    this.state = this.defaultState;
  }

  getStyle() {
    return {
      left: this.props.x + this.state.offsetX,
      top: this.props.y + this.state.offsetY,
      width: this.state.overrideWidth || this.props.width,
      height: this.state.overrideHeight || this.props.height,
    };
  }

  onMove(event)  {
    this.setState( (prevState, props) => {
      return {
        offsetX: prevState.offsetX + event.dx,
        offsetY: prevState.offsetY + event.dy,
        transform: true
      };
    });
  }

  onMoveEnd(event) {
    this.setState(this.defaultState);
    this.props.onMove(this.props.id, this.props.x + event.dx, this.props.y + event.dy, this.props.width, this.props.height);
  }

  onResize(event) {
    this.setState( (prevState, props) => {
      return {
        offsetX: prevState.offsetX + event.deltaRect.left,
        offsetY: prevState.offsetY + event.deltaRect.top,
        overrideWidth: event.rect.width,
        overrideHeight: event.rect.height,
        transform: true
      };
    });

  }

  onResizeEnd(event) {
    const style = this.getStyle();
    this.setState(this.defaultState);

    this.props.onMove(this.props.id, style.left, style.top, style.width, style.height);
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {

    const style = this.getStyle();

    const draggableOptions = {
      onmove: event => this.onMove(event),
      onend: event => this.onMoveEnd(event)
    }

    const resizableOptions = {
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true },

    }
    const events = {
      resizemove: event => this.onResize(event),
      resizeend: event => this.onResizeEnd(event),
      tap: event => this.onClick()
    }

    return (
      <Interactable draggable draggableOptions={draggableOptions} resizable resizableOptions={resizableOptions} events={events} >
        <div className="note-box" style={style} >
          <font size="5">
            {this.props.text}
          </font>
        </div>
      </Interactable>
    );
  }
}
export default Note;
