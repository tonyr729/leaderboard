import React from 'react';
import iconLogo from '../../../assets/logo.svg';
import '../../../fontello/css/fontello.css';
import './SidebarCollapsed.css';

const SidebarCollapsed = () => {
  return (
    <div className="sidebarrCollapsed">
      <img className="sidebar__logo" src={iconLogo} alt="icon logo" />
      <section className="sidebar__section-main">
        <button><i className="icon-chart-bar"></i></button>
        <button><i className="icon-user"></i></button>
        <button><i className="icon-youtube-play"></i></button>
      </section>
      <section className="sidebar__section-admin">
        <button disabled><i className="icon-plus"></i></button>
        <button disabled><i className="icon-chart-bar"></i></button>
        <button disabled><i className="icon-user"></i></button>
        <button disabled><i className="icon-youtube-play"></i></button>
      </section>
    </div>
  );
};

export default SidebarCollapsed;