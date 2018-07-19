import React, { Component } from 'react';
import { subscribeToTimer } from '../../timer';
import './Events.css';

class Events extends Component {
  constructor() {
    super();
  };

  // componentDidMount(){
  //   subscribeToTimer((err, timestamp) => console.log(timestamp))
  // }

  render() {
    return (
      <div className="events">
        <h1>CHECK OUT ALL THESE EVENTS!!!</h1>
      </div>
    )
  }
}

export default Events;