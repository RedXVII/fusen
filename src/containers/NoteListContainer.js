import {connect} from 'react-redux';
import { setSelectedNote } from '../actions/noteActions';
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
    }
  };
}

const NoteListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)

export default NoteListContainer;
