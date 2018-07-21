import React, { Component } from 'react';
import { subscribeToChange } from '../../timer';
import { addResults } from '../../actions';
import { connect } from 'react-redux';
import './Events.css';

class Events extends Component {
  constructor() {
    super();
    this.state ={
      input: '' 
    };
  };

  componentDidMount(){
    this.changeValues();
    this.getResults();
  }

  handleInput = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  getResults = async () => {
    const url = '/api/v1/events/1/division/8/results';
    const response = await fetch(url);
    const data = await response.json();
    const unresolvedResults = data.results.map(async result => {
      const rider = await this.getRider(result.rider_id);
      return Object.assign(result, {name: rider[0].name});
    });
    const results = await Promise.all(unresolvedResults);
    this.props.addAllResults(results);
  }

  getRider = async (riderId) => {
    const url = `/api/v1/riders/${riderId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.rider;
  }
  
  changeValues = () => {
    subscribeToChange((error, changeAfter) => console.log(changeAfter), this.state.input);
  }

  render() {
    return (
      <div className="events">
        <h2>Leaderboard<span>for</span></h2>
        <div>
          <h1>Tahoe Invitational</h1>
          <select>
            <option value="halfpipe" data-divisionid="8">Halfpipe</option>
            <option value="big-air" data-divisionid="6">Big Air</option>
          </select>
        </div>
        {/* <input onChange={this.handleInput} name="input" value={this.state.input} className="change_input" type="text"/>
        <button onClick={this.changeValues} className="change_button">Change Value</button> */}
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addAllResults: (results) => dispatch(addResults(results))
});

export default connect(null, mapDispatchToProps)(Events);