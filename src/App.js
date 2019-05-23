import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateNote from './components/CreateNote';
import Note from './components/Note';
import Main from './components/Main';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UpdateNote from './components/UpdateNote';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/update/:note_id' component={UpdateNote} />
            <Route exact path='/note' component={CreateNote} />
            <Route exact path='/note/:note_id' component={Note} />
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;