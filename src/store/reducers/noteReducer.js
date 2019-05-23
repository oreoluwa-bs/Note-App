const initState = {
    // notes: [
    //     { id: '1', title: 'Help me find peach', content: 'She is missing' },
    //     { id: '2', title: 'Collect the Stars', content: 'They are blue' },
    //     { id: '3', title: 'Muse with Us', content: 'We are amazing' },
    // ]
}

const noteReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            console.log('Note created', action.note);
            return state;
        case 'CREATE_NOTE_ERROR':
            console.log("Couldn't create note", action.err);
            return state;
        case 'DELETE_NOTE':
            console.log('Note deleted', action.id);
            return state;
        case 'DELETE_NOTE_FAILED':
            console.log("Couldn't delete note", action.err);
            return state;
        case 'UPDATE_NOTE':
            console.log('Note updated', action.id);
            return state;
        case 'UPDATE_NOTE_ERROR':
            console.log("Couldn't update note", action.err);
            return state;
        default:
            return state;
    }
};

export default noteReducer;