import React from 'react';
import { NavLink } from 'react-router-dom';
import titleLogo from '../../assets/Leaderboard-Type-Logo-FLAT.svg';
import '../../fontello/css/fontello.css';
import './SidebarFull.css';

const SidebarFull = () => {
  return (
    <div className="sidebar-full">
      <img className="sidebar__title-logo"src={titleLogo} alt="title logo"/>
      <section className="sidebar__section-main">
        <h3>Main</h3>
        <button><i className="icon-chart-bar"></i> Events</button>
        <button><i className="icon-user"></i> Riders</button>
        <button><i className="icon-youtube-play"></i> Media</button>
      </section>
      <section className="sidebar__section-admin">
        <h3>Admin</h3>
        <button disabled><i className="icon-plus"></i> Update Leaderboard</button>
        <button disabled><i className="icon-chart-bar"></i> Create Event</button>
        <button disabled><i className="icon-user"></i> Add Riders</button>
        <button disabled><i className="icon-youtube-play"></i> Add Media</button>
      </section>
      <NavLink exact to='/Admin' className='nav' activeClassName='selected'>
        <button id="sidebar__btn-admin">Admin Login</button>
      </NavLink> 
    </div>
  )
}

export default SidebarFull;