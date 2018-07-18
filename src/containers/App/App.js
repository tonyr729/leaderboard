import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        REACT YO FACE!
        <Sidebar />
        <section className="mainContainer" >
          <Switch>
            <Route exact path='/' component={Events} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
