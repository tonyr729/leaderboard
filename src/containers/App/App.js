import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Events from '../Events/Events';
import Admin from '../Admin/Admin';
import { addEvents } from '../../actions';
import './App.css';

class App extends Component {

  async componentDidMount() {
    const key = await fetch('https://leaderboard-byob.herokuapp.com/authenticate', {
      method: 'POST',
      email: 'ericmellow@turing.io',
      appName: 'Leader Board'
    });
    const response = await fetch('https://leaderboard-byob.herokuapp.com/api/v1/events', {
      "authorization": key
    });
    const data = await response.json();
  }
  render() {
    return (
      <div className="App">
        <Sidebar />
        <section className="mainContainer" >
          <Switch>
            <Route exact path='/' component={Events} />
            <Route exact path='/Admin' component={Admin} />
          </Switch>
        </section>
      </div>
    );
  }
}


export default App;
