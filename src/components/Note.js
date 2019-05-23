import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteNote } from '../store/actions/noteActions'
import marked from 'marked';

class Note extends React.Component {
    handleDelete = (e) => {
        e.preventDefault();

        this.props.deleteNote(this.props.id);
        this.props.history.push('/');
    }
    content = () => {
        const rawMarkup = marked(this.props.note.content, {sanitize: true});
        return { __html: rawMarkup };
    }
    render() {
        const { note, id } = this.props;
        
        if (!note) { return <Redirect to='/' /> }
        return (
            <div className='card note-card'>
                <nav className="header navbar navbar-expand navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/' className="nav-link">
                                <FontAwesomeIcon icon={faArrowLeft} size='2x' color="gainsboro" />
                            </Link>
                        </li>
                    </ul>
                    <span className="navbar-brand" href="#">
                        {note.title}
                    </span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={'/update/' + id} className="ahate nav-link">
                                    <FontAwesomeIcon icon={faPencilAlt} size='2x' color="steelblue" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={this.handleDelete}>
                                    <FontAwesomeIcon icon={faTrashAlt} size='2x' color="crimson" />
                                </span>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="card-body">
                    <span className='card-text' dangerouslySetInnerHTML={this.content()} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.note_id;
    const notes = state.firestore.data.notes;
    const note = notes ? notes[id] : null
    return {
        id: id,
        note: note,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteNote: (id) => dispatch(deleteNote(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'notes' }
    ])
)(Note)