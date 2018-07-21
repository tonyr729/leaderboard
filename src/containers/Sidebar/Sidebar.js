import React, { Component } from 'react';
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
        <button>Admin Login</button>
      </div>
    )
  }
}

export default Sidebar;