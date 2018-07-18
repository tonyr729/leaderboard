import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Events from '../Events/Events';
import { addEvents } from '../../actions';
import './App.css';

class App extends Component {

  componentDidMount() {
    const events = ['event 1', 'event 2', 'event 3', ];
    this.props.addAllEvents(events);
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
