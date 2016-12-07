import React from 'react';
import Interactable  from '../helpers/Interactable';
import './Note.css';


class Note extends React.Component {

  render() {

    const style = {
      left: this.props.x,
      top: this.props.y,
      width: this.props.width,
      height: this.props.height,
    };

    const draggableOptions = {
    	 onmove: event => {
    		const target = event.target
    	  // keep the dragged position in the data-x/data-y attributes
    	  const tmpX = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    	  const tmpY = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    	  // translate the element
    	  target.style.webkitTransform =
    	  target.style.transform =
    	    'translate(' + tmpX + 'px, ' + tmpY + 'px)'

    	  // update the posiion attributes
    	  target.setAttribute('data-x', tmpX);
    	  target.setAttribute('data-y', tmpY);
    	},

      onend: event => {

        event.target.style.webkitTransform =
    	  event.target.style.transform =
          null;
        event.target.removeAttribute('data-x');
        event.target.removeAttribute('data-y');
        this.props.onMove(this.props.id, this.props.x + event.dx, this.props.y + event.dy, this.props.width, this.props.height);
      }
    }

    return (
      <Interactable draggable draggableOptions={draggableOptions}>
        <div className="note-box" style={style} onClick={() => this.props.onClick(this.props.id)}>
          <font size="5">
            {this.props.text}
          </font>
        </div>
      </Interactable>
    );
  }
}
export default Note;
