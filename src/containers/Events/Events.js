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
    const results = this.props.results.map(result => {
      return (
        <div className="result" id={result.id} key={result.id}>
          <img src="" alt=""/>
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
      )
    })

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
})

export const mapDispatchToProps = (dispatch) => ({
  addAllResults: (results) => dispatch(addResults(results))
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);