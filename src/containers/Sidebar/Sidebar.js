import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h1>Leaderboard</h1>
        <section className="main">
          <h3>Main</h3>
          <button>Events</button>
          <button>Riders</button>
          <button>Media</button>
        </section>
        <NavLink exact to='/Admin' className='nav' activeClassName='selected'>
          <button>Admin Login</button>
        </NavLink>      
      </div>
    )
  }
}

export default Sidebar;