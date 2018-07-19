import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Events from '../Events/Events';
import { addEvents } from '../../actions';
import './App.css';

class App extends Component {

  async componentDidMount() {
    const response = await fetch('https://leaderboard-byob.herokuapp.com/api/v1/events', {
      "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWNtZWxsb3dAdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkxlYWRlciBCb2FyZCIsImlhdCI6MTUzMjAzNjk4MSwiZXhwIjoxNTMyMjA5NzgxLCJqdGkiOiJhZG1pbiJ9.YV_xWYC8mQg0TQzYQT6_jSKSs0dIIeScA4ta8BMIBCE"
    });
    const data = await response.json();
    this.props.addAllEvents(data.events);
  }
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

export const mapDispatchToProps = (dispatch) => ({
  addAllEvents: (events) => dispatch(addEvents(events))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
