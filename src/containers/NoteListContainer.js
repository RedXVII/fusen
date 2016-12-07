import {connect} from 'react-redux';
import { setSelectedNote, transformNote } from '../actions/noteActions';
import NoteList from '../components/NoteList';

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNoteClick: (noteId) => {
      dispatch(setSelectedNote(noteId));
    },
    onNoteMove:  (noteId, x, y, width, height) => {
      dispatch(transformNote(noteId, x, y, width, height));
    }
  };
}

const NoteListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)

export default NoteListContainer;
