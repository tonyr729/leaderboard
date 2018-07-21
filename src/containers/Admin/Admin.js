import React, { Component } from 'react';
import { addRiders } from '../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Admin.css';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      event: '',
      division: '',
      rider: '',
      runOne: '',
      runTwo: '',
      runThree: ''
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
        <option id="rider" value={rider.id}>{rider.name}</option>
      );
    });

    return ridersList;
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
    console.log(this.state)

    //SEND STATE AS REQUEST BODY FOR PATCH ENDPOINT
  };
 
  render() {
    return (
      <div className="admin">
        <div className="admin-update">
          <label htmlFor="rider-names" className="choose-event">
            Choose Event
            <select onChange={this.handleChange} 
                    id="event" 
                    className="event-names" 
                    value={this.state.event} >
              <option value="">Choose a Event</option>
              <option value="1">Olympics</option>
            </select>
          </label>
          <label htmlFor="division-names" className="choose-division">
            Choose Division
            <select onChange={this.handleChange} 
                    id="division" 
                    className="division-names" 
                    value={this.state.division} >
              <option value="">Choose a Division</option>
              <option name="event" value="3">Womens Halfpipe</option>
              <option name="event" value="8">Mens Halfpipe</option>
            </select>
          </label>
          <label htmlFor="rider-names" className="choose-rider">
            Choose Rider
            <select onChange={this.handleChange} 
                    id="rider" 
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
                id="runOne"
                className='admin-input'/>
            </label>
            <label className='runtwo-label'>
              Run 2:
              <input type="text" 
                onChange={this.handleChange}
                value={this.state.runTwo}
                id="runTwo"
                className='admin-input'/>
            </label>
            <label className='runthree-label'>
              Run 3:
              <input type="text" 
                onChange={this.handleChange}
                value={this.state.runThree}
                id="runThree"
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
