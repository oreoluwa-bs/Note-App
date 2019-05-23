import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { signOut } from '../store/actions/authActions'
import moment from 'moment'


class Main extends Component {
    render() {
        const { notes, auth, signOut } = this.props;

        if (!auth.uid) { return <Redirect to='/signin' /> }
        return (
            <div className="App">
                <nav className="header navbar navbar-expand navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand" href="#">Notes</span>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/note' className="nav-link">
                                        <FontAwesomeIcon icon={faPlusCircle} size='3x' color="steelblue" />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" onClick={signOut}>
                                        <FontAwesomeIcon icon={faSignOutAlt} size='3x' color="crimson" />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <br />

                <div className="container-fluid">
                    <ul className="list-group">
                        {
                            notes && notes.map((item) => {
                                return (
                                    <Link key={item.id} className="list-item" to={{
                                        pathname: `/note/${item.id}`,
                                    }}>
                                        <li className="list-group-item"><strong>{item.title}</strong> <span className='float-right created-time text-muted'>{moment(item.createdAt.toDate()).calendar()}</span></li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = (state) => {
    const auth = state.firebase.auth;
    const allnotes = state.firestore.ordered.notes
    const notes = allnotes ? allnotes.filter(note => note.authorId === auth.uid) : null
    return {
        auth: auth,
        notes: notes
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    connect(mapStatetoProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'notes', orderBy: ['createdAt', 'desc'] },
    ])
)(Main);