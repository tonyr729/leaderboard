import React, { Component } from 'react';
import { subscribeToChange } from '../../timer';
import { addResults, updateResult } from '../../actions';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import './Events.css';

export class Events extends Component {
  constructor() {
    super();
    this.state ={
      lastUpdated: 0
    };
  }

  componentDidMount() {
    this.changeValues();
    this.getResults();
  }

  getResults = async () => {
    const url = 'https://leaderboard-byob.herokuapp.com/api/v1/events/1/division/8/results';
    const response = await fetch(url);
    const riderData = await response.json();
    const unresolvedResults = riderData.results.map(async result => {
      const rider = await this.getRider(result.rider_id);
      return Object.assign(result, {name: rider[0].name, image: rider[0].img});
    });
    const results = await Promise.all(unresolvedResults);
    const orderedResults = this.orderResults(results);
    this.props.addAllResults(orderedResults);
  }

  getRider = async (riderId) => {
    const url = `https://leaderboard-byob.herokuapp.com/api/v1/riders/${riderId}`;
    const response = await fetch(url);
    const riderData = await response.json();
    return riderData.rider;
  }
  
  changeValues = () => {
    subscribeToChange((error, changeAfter) => this.storeNewResult(changeAfter));
  }

  storeNewResult = (newResult) => {
    console.log(newResult)
    if (newResult) {
      const updatedResults = this.changeScore(newResult);
      const newResults = this.orderResults(updatedResults);
      this.props.updateResults(newResults);
      this.setState({
        lastUpdated: Date.now()
      });
    }
  }

  orderResults = (updatedResults) => {
    const newResults = updatedResults.map(result => {
      const run1 = parseInt(result.run_1, 10);
      const run2 = parseInt(result.run_2, 10);
      const run3 = parseInt(result.run_3, 10);
      if (run1 && run2 && run3) {
        result.final =  (run1 + run2 + run3) / 3;
      } else if (run1 && run2 && !run3) {
        result.final = (run1 + run2)/2;
      } else {
        result.final = run1;
      }
      return result;
    });
    return newResults.sort((a, b) => b.final - a.final);
  }

  changeScore = (newResult) => {
    const updatedResults = this.props.results.map(result => {
      if (
        result.rider_id === parseInt(newResult.rider_id, 10) &&
        result.event_id === parseInt(newResult.event_id, 10) &&
        result.division_id === parseInt(newResult.division_id, 10)
      ) {
        const { run_1, run_2, run_3 } = newResult;
        !run_1 || (result.run_1 = run_1);
        !run_2 || (result.run_2 = run_2);
        !run_3 || (result.run_3 = run_3);

        const { run_1_media, run_2_media, run_3_media } = newResult;
        !run_1_media || (result.run_1_media = run_1_media);
        !run_2_media || (result.run_2_media = run_2_media);
        !run_3_media || (result.run_3_media = run_3_media);
      }
      return result;
    });
    return updatedResults;
  }

  getScore = (result) => {
    const run1 = parseInt(result.run_1, 10);
    const run2 = parseInt(result.run_2, 10);
    const run3 = parseInt(result.run_3, 10);
    if (run1 && run2 && run3) {
      const score = (run1 + run2 + run3) / 3;
      return Math.round( score * 10 ) / 10;
    } else if (run1 && run2 && !run3) {
      const score = (run1 + run2)/2;
      return Math.round(score * 10) / 10;
    } else {
      const score = run1;
      return Math.round(score * 10) / 10;
    }
  }

  render() {
    let currentUrl = '';

    const results = this.props.results.map((result, index) => {
      currentUrl = result.run_3_media || result.run_2_media || result.run_1_media || '';
      const iframeClass = currentUrl ? 'expanded' : '';
      return (
        <div key={result.id}>
          <div className="result" id={result.id} >
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
            <div className="final-score">
              <h4>FINAL</h4>
              <h4 className="final-result">{this.getScore(result)}</h4>
            </div>
          </div>
          <iframe src={currentUrl} width="640" height="360" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen className={iframeClass}></iframe>
        </div>
      );
    });

    return (
      <div className="events">
        <h2>Leaderboard<span> for</span></h2>
        <div className="event-div">
          <h1>Tahoe Invitational</h1>
          <select>
            <option value="halfpipe" data-divisionid="8">Mens Big Air</option>
            <option value="big-air" data-divisionid="6">Womens Big Air</option>
          </select>
        </div>
        <div className="results-container">
          <FlipMove duration={750}>
            {results}
          </FlipMove>
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