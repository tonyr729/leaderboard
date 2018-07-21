import React, { Component } from 'react';
import { subscribeToChange } from '../../timer';
import './Events.css';

class Events extends Component {
  constructor() {
    super();
    this.state ={
      input: '' 
    }
  };

  componentDidMount(){
    subscribeToTimer((err, timestamp) => console.log(timestamp))
  }

  handleInput = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }
  
  changeValues = () => {
    subscribeToChange((error, changeAfter) => console.log(changeAfter), this.state.input);
  }

  render() {
    return (
      <div className="events">
        <h1>CHECK OUT ALL THESE EVENTS!!!</h1>
        <input onChange={this.handleInput} name="input" value={this.state.input} className="change_input" type="text"/>
        <button onClick={this.changeValues} className="change_button">Change Value</button>
      </div>
    )
  }
}

export default Events;