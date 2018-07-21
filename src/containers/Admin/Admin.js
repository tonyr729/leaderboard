import React, { Component } from 'react';
import './Admin.css';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      riderName: '',
      riderDivision: ''
    }
  };

  submitChanges = () => {
    console.log(this.state)
  }
 
  render() {
    return (
      <div className="admin">
        <div className="admin-update">
          <form id="updateForm">
            <input type="text" 
              onChange={this.handleFormChange}
              value={this.state.riderName}
              name="riderName"
              className='admin-input'/>
            <input type="text" 
              onChange={this.handleFormChange}
              value={this.state.riderDivision}
              name="riderDivision"
              className='admin-input'/>
            <button onSubmit={this.submitChanges}className="form-submit">Update</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Admin;