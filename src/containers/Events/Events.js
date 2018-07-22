import React, { Component } from 'react';
import { subscribeToChange } from '../../timer';
import { addResults, updateResult } from '../../actions';
import { connect } from 'react-redux';
import './Events.css';

class Events extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    this.changeValues();
    this.getResults();
  }

  getResults = async () => {
    const url = '/api/v1/events/1/division/8/results';
    const response = await fetch(url);
    const riderData = await response.json();
    const unresolvedResults = riderData.results.map(async result => {
      const rider = await this.getRider(result.rider_id);
      console.log(rider);
      return Object.assign(result, {name: rider[0].name, image: rider[0].img});
    });
    const results = await Promise.all(unresolvedResults);
    this.props.addAllResults(results);
  }

  getRider = async (riderId) => {
    const url = `/api/v1/riders/${riderId}`;
    const response = await fetch(url);
    const riderData = await response.json();
    return riderData.rider;
  }
  
  changeValues = () => {
    subscribeToChange((error, changeAfter) => this.storeNewResult(changeAfter));
  }

  storeNewResult = (newResult) => {
    const cleanedResults = this.props.results.filter(result => {
      return result.rider_id !== newResult.rider_id &&
             result.event_id !== newResult.event_id &&
             result.division_id !== newResult.division_id;
    });
    const updatedResults = cleanedResults.push(newResult);
    this.props.updateResults(updatedResults);
  }

  render() {
    const results = this.props.results.map((result, index) => {
      return (
        <div className="result" id={result.id} key={result.id}>
          <h1>{index+1}</h1>
          <img src={result.image} alt="flag"/>
          <h1>{result.name}</h1>
          <div className="run1">
            <h4>Run 1</h4>
            <h4 className="h4-result">{result.run_1}</h4>
          </div>
          <div className="run2">
            <h4>Run 2</h4>
            <h4 className="h4-result">{result.run_2}</h4>
          </div>
          <div className="run3">
            <h4>Run 3</h4>
            <h4 className="h4-result">{result.run_3}</h4>
          </div>
        </div>
      );
    });

    return (
      <div className="events">
        <h2>Leaderboard<span> for</span></h2>
        <div className="event-div">
          <h1>Tahoe Invitational</h1>
          <select>
            <option value="halfpipe" data-divisionid="8">Halfpipe</option>
            <option value="big-air" data-divisionid="6">Big Air</option>
          </select>
        </div>
        <div className="results-container">
          {results}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  results: state.results
});

export const mapDispatchToProps = (dispatch) => ({
  addAllResults: (results) => dispatch(addResults(results)),
  updateResults: (results) => dispatch(updateResult(results))
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);