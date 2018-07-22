import React, { Component } from 'react';
import { addRiders } from '../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Admin.css';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      event_id: '',
      division_id: '',
      rider_id: '',
      run_1: null,
      run_2: null,
      run_3: null
    }
  };

  componentDidMount() {
    this.getRiders();
  }

  getRiders = async () => {
    const url = '/api/v1/riders';
    const response = await fetch(url);
    const data = await response.json();
    this.props.addAllRiders(data.riders);
  }

  listRiders = () => {
    const ridersList = this.props.riders.map(rider => {
      return (
        <option id="rider_id" value={rider.id}>{rider.name}</option>
      );
    });

    return ridersList;
  }

  sendResults = async (results) => {
    const url = `/api/v1/events/${results.event_id}/divisions/${results.division_id}/riders/${results.rider_id}`;
    console.log(results)
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({result: results})
    });
    // const data = response.json()
    console.log(response)
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    console.log(id)
    this.setState({
      [id]: value
    });
  }

  submitChanges = (event) => {
    event.preventDefault();
    this.sendResults(this.state)
    //SEND STATE AS REQUEST BODY FOR PATCH ENDPOINT
  };
 
  render() {
    return (
      <div className="admin">
        <div className="admin-update">
          <label htmlFor="rider-names" className="choose-event">
            Choose Event
            <select onChange={this.handleChange} 
                    id="event_id" 
                    className="event-names" 
                    value={this.state.event} >
              <option value="">Choose a Event</option>
              <option value="1">Olympics</option>
            </select>
          </label>
          <label htmlFor="division-names" className="choose-division">
            Choose Division
            <select onChange={this.handleChange} 
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
            <select onChange={this.handleChange} 
                    id="rider_id" 
                    className="rider-names" 
                    value={this.state.value} >
              <option value="">Choose a Rider</option>
              {this.listRiders()}
            </select>
          </label>
          <form id="updateForm" onSubmit={this.submitChanges}>
            <label className='runone-label'>
              Run 1:
              <input type="text" 
                onChange={this.handleChange}
                value={this.state.runOne}
                id="run_1"
                className='admin-input'/>
            </label>
            <label className='runtwo-label'>
              Run 2:
              <input type="text" 
                onChange={this.handleChange}
                value={this.state.runTwo}
                id="run_2"
                className='admin-input'/>
            </label>
            <label className='runthree-label'>
              Run 3:
              <input type="text" 
                onChange={this.handleChange}
                value={this.state.runThree}
                id="run_3"
                className='admin-input'/>
            </label>
            <input type="submit" value="Update" className="form-submit" />
          </form>
        </div>
        <div className="add-media">
          <p className="coming-soon">Feature Coming Soon</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
