const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_FAILED':
            console.log('Login unsuccessful', action.err);
            return {
                ...state,
                authError: 'Email Address or Password may be incorrect',
            }

        case 'LOGIN_SUCCESS':
            console.log('Login successful');
            return {
                ...state,
                authError: null,
            }

        case 'SIGNOUT_SUCCESS':
            console.log('Sign out successful');
            return state

        case 'SIGNUP_SUCCESS':
            console.log('Signup succesful');
            return {
                ...state,
                authError: null,
            }

        case 'SIGNUP_FAILED':
            console.log('Signup unsuccessful');
            return {
                ...state,
                authError: action.err.message,
            }

        default:
            return state
    }
};

export default authReducer;