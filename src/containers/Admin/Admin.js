import React, { Component } from 'react';
import { addRiders } from '../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { subscribeToChange } from '../../timer';

import './Admin.css';

export class Admin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getRiders();
    this.sendResultToSocket();
  }

  getRiders = async () => {
    const url = 'https://leaderboard-byob.herokuapp.com/api/v1/riders';
    const response = await fetch(url);
    const riderData = await response.json();
    this.props.addAllRiders(riderData.riders);
  }

  listRiders = () => {
    const ridersList = this.props.riders.map(rider => {
      return (
        <option 
          id="rider_id" 
          value={rider.id} 
          key={`option${rider.id}`}>
          {rider.name}
        </option>
      );
    });

    return ridersList;
  }

  sendResultToDb = async (results) => {
    const url = `https://leaderboard-byob.herokuapp.com/api/v1/events/${results.event_id}/divisions/${results.division_id}/riders/${results.rider_id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ result: results })
    });
    const message = await response.json();
    return message;
  }

  sendResultToSocket = (results) => {
    subscribeToChange((error, changeAfter) => changeAfter, results);
  };

  handleChange = (event) => {
    const { id, value } = event.target;
    if (value) {
      this.setState({
        [id]: value
      });
    }
  }

  submitChanges = (event) => {
    event.preventDefault();
    this.sendResultToDb(this.state);
    this.sendResultToSocket(this.state);
  };

  render() {
    return (
      <div className="admin">
        <div className="admin-update">
          <label htmlFor="event-names" className="choose-event">
            Choose Event
            <select
              onChange={this.handleChange}
              id="event_id"
              className="event-names"
              value={this.state.event} >
              <option value="">Choose a Event</option>
              <option value="1">Olympics</option>
            </select>
          </label>
          <label htmlFor="division-names" className="choose-division">
            Choose Division
            <select
              onChange={this.handleChange}
              id="division_id"
              className="division-names"
              value={this.state.division} >
              <option value="">Choose a Division</option>
              <option value="3">Womens Halfpipe</option>
              <option value="8">Mens Halfpipe</option>
            </select>
          </label>
          <label htmlFor="rider-names" className="choose-rider">
            Choose Rider
            <select
              onChange={this.handleChange}
              id="rider_id"
              className="rider-names"
              value={this.state.value} >
              <option value="">Choose a Rider</option>
              {this.listRiders()}
            </select>
          </label>
          <form id="updateForm" onSubmit={this.submitChanges}>
            <div>
              <label className='runone-label'>
                Run 1:
                <input type="number"
                  onChange={this.handleChange}
                  value={this.state.run_1}
                  id="run_1"
                  className='admin-input'
                  placeholder="Score" />
              </label>
              <label className='runone-label'>
                <input type="text"
                  onChange={this.handleChange}
                  value={this.state.run_1_media}
                  id='run_1_media'
                  placeholder="Media URL"
                  className="media-input" />
              </label>
            </div>
            <div>
              <label className='runtwo-label'>
                Run 2:
                <input type="number"
                  onChange={this.handleChange}
                  value={this.state.run_2}
                  id="run_2"
                  className='admin-input'
                  placeholder="Score" />
              </label>
              <label className='runone-label'>
                <input type="text"
                  onChange={this.handleChange}
                  value={this.state.run_2_media}
                  id='run_2_media'
                  placeholder="Media URL"
                  className="media-input" />
              </label>
            </div>
            <div>
              <label className='runthree-label'>
                Run 3:
                <input type="number"
                  onChange={this.handleChange}
                  value={this.state.run_3}
                  id="run_3"
                  className='admin-input'
                  placeholder="Score" />
              </label>
              <label className='runone-label'>
                <input type="text"
                  onChange={this.handleChange}
                  value={this.state.run_3_media}
                  id='run_3_media'
                  placeholder="Media URL"
                  className="media-input" />
              </label>
            </div>
            <input type="submit" value="Update" className="form-submit" />
          </form>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  riders: state.riders
});

export const mapDispatchToProps = (dispatch) => ({
  addAllRiders: (riders) => dispatch(addRiders(riders))
});

Admin.propTypes = {
  riders: PropTypes.array,
  addAllRiders: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
