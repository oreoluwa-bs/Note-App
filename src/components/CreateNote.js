import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { createNote } from '../store/actions/noteActions';

class CreateNote extends React.Component {
    state = {
        title: '',
        content: '',
    }
    handleTextInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    addNote = (e) => {
        e.preventDefault();
        if (this.state.content !== '' || this.state.title !== '') {
            this.props.createNote(this.state);
            this.props.history.push('/');
        }
    }
    render() {
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
                    <button onClick={this.addNote} className="btn btn-primary float-right">Save</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNote: (note) => dispatch(createNote(note))
    }
}

export default connect(null, mapDispatchToProps)(CreateNote)