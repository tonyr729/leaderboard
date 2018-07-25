import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Events from '../Events/Events';
import Admin from '../Admin/Admin';
import './App.css';

class App extends Component {

  async componentDidMount() {
  
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
