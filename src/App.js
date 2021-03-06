import React, { Component } from 'react';

import logo_cat from './logo_cat.png';
import Splash from './components/Splash.js';
import HomePage from './components/HomePage.js';
import CodeSnippet from './components/CodeSnippet.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  Redirect,
  withRouter
} from 'react-router-dom';

import { auth } from './utils/firebase';

class App extends Component {
  constructor(props) {
  super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged(newUser => {
      if (newUser) {
        console.log('logged in!', newUser);
        this.setState({ currentUser: newUser });
      } else {
        console.log('logged out.');
        this.setState({ currentUser: null });
      }
    });
  }

  render() {
    let appActiveContent;
    if (!this.state.currentUser){
      appActiveContent = <Splash currentUser={ this.state.currentUser } />
    } else if (this.state.currentUser){
      appActiveContent =
        <div>
          <HomePage currentUser={ this.state.currentUser } />
        </div>
    } else {
      appActiveContent =
        <div>
          <h1> Unexplained error!!! (psst, it was aliens...)</h1>
        </div>
    }

    return (
      <div className="App">
        <Header />
        {appActiveContent}
        <Footer />
      </div>
    );
  }
}

export default App;
