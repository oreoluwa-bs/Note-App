export const createNote = (note) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        firestore.collection('notes').add({
            ...note,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_NOTE', note });
        }).catch((err) => {
            dispatch({ type: 'CREATE_NOTE_ERROR', err });
        })
    }
};


export const deleteNote = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        
        firestore.collection('notes').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_NOTE', id });
        }).catch((err) => {
            dispatch({ type: 'DELETE_NOTE_FAILED', err });
        })
    }
};

export const updateNote = (id,note) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('notes').doc(id).set({
            ...note,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'UPDATE_NOTE', id });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_NOTE_FAILED', err });
        })
    }
};