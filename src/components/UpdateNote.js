import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { updateNote } from '../store/actions/noteActions';

class UpdateNote extends React.Component {
    state = {
        title: this.props.note.title,
        content: this.props.note.content,
    }
    handleTextInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    updateNote = (e) => {
        e.preventDefault();
        if (this.state.content !== '' || this.state.title !== '') {

            this.props.updateNote(this.props.id, this.state);
            this.props.history.push('/');
        }
    }
    render() {
        const { note } = this.props;

        if (!note) { return <Redirect to='/' /> }
        return (
            <div className='card'>
                <nav className="header navbar navbar-expand navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/' className="nav-link">
                                <FontAwesomeIcon icon={faArrowLeft} size='2x' color="gainsboro" />
                            </Link>
                        </li>
                    </ul>
                    <span className="navbar-brand" href="#">
                        <input id='title' className="form-control" value={this.state.title} onChange={this.handleTextInput} />
                    </span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">

                        </ul>
                    </div>
                </nav>
                <div className="card-body">
                    <textarea id='content' onChange={this.handleTextInput} className="form-control card-text" aria-label="With textarea" defaultValue={this.state.content}></textarea>
                    <button onClick={this.updateNote} className="btn btn-primary float-right">Save</button>
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
        updateNote: (id, note) => dispatch(updateNote(id, note))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNote)