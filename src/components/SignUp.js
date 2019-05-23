import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../store/actions/authActions'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.signUp(this.state);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
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
                            <h5 className='text-grey'>Join the party</h5>
                            <form className="register-form" onSubmit={this.handleSubmit} autoComplete="off">
                                <div className="form-group">
                                    <label htmlFor='firstName'>First Name</label>
                                    <input className='form-control' type='text' id='firstName' onChange={this.handleChange} placeholder="John" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='lastName'>Last Name</label>
                                    <input className='form-control' type='text' id='lastName' onChange={this.handleChange} placeholder="Doe" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='email'>Email</label>
                                    <input id='email' type="text" className="form-control" onChange={this.handleChange} placeholder="john.doe@gmail.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor='password'>Password</label>
                                    <input id='password' type='password' className="form-control" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Join the party</button>
                                    <p className="message">Already have an account? <Link to='/signin' >Login</Link></p>
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
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)