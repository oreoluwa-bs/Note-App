import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { Redirect, Link } from 'react-router-dom';


class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }
    render() {
        const { authError, auth } = this.props

        if (auth.uid) { return <Redirect to='/' /> }

        return (
            <div className='login'>
                <div className='container'>
                    <div className='login-page'>
                        <div className="form">
                            <div className="text-right error-message text-danger">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                            <h5 className='text-grey'>Login</h5>
                            <form className="register-form" onSubmit={this.handleSubmit} >
                                <div className="form-group">
                                    <label htmlFor='email'>Email</label>
                                    <input id='email' type="text" className="form-control" onChange={this.handleChange} placeholder="john.doe@gmail.com" autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='password'>Password</label>
                                    <input id='password' type='password' className="form-control" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Login</button>
                                    <p className="message">Not registered? <Link to='/signup' >Join the party</Link></p>

                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)