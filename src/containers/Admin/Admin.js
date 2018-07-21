import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Admin.css';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      runOne: '',
      runTwo: '',
      runThree: ''
    }
  };

  generateRiders = () => {

  }

  handleFormChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  submitChanges = (event) => {
    event.preventDefault();
    console.log(this.state)
  }
 
  render() {
    return (
      <div className="admin">
        <div className="admin-update">
          <label for="rider-names" className="choose-rider">Choose Rider
            <select id="rider-names" className="rider-names">
              <option value="">Choose a rider</option>
            </select>
          </label>
          <form id="updateForm" onSubmit={this.submitChanges}>
            <label className='runone-label'>
              Run 1:
              <input type="text" 
                onChange={this.handleFormChange}
                value={this.state.runOne}
                name="runOne"
                className='admin-input'/>
            </label>
            <label className='runtwo-label'>
              Run 2:
              <input type="text" 
                onChange={this.handleFormChange}
                value={this.state.runTwo}
                name="runTwo"
                className='admin-input'/>
            </label>
            <label className='runthree-label'>
              Run 3:
              <input type="text" 
                onChange={this.handleFormChange}
                value={this.state.runThree}
                name="runThree"
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



// export default withRouter(connect(mapStateToProps,)(Admin));

export default Admin;