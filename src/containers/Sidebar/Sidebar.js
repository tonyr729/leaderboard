import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SidebarFull from '../SidebarFull/SidebarFull';
import SidebarCollapsed from '../SidebarCollapsed/SidebarCollapsed';
import '../../fontello/css/fontello.css';
import './Sidebar.css';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    }
  }

  toggleSidebar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const sidebar = this.state.collapsed ? <SidebarCollapsed /> : <SidebarFull />;
    const sidebarClass = this.state.collapsed ? "sidebar min" : "sidebar"
    const icon = this.state.collapsed ? "icon-right-dir" : "icon-left-dir"
    const adminText = this.state.collapsed ? (<i className="icon-lock"></i>) : "Admin Login";
    const adminClass = this.state.collapsed ? "sidebar__btn-admin min" : "sidebar__btn-admin";

    return (
      <div className="sidebar-container">
        <div className={sidebarClass}>
          {sidebar}    
          <NavLink exact to='/Admin' className='nav' activeClassName='selected'>
            <button className={adminClass}>{adminText}</button>
          </NavLink> 
        </div>
        <div className="sidebar__collapse-btn">
          <i className={icon} onClick={() => this.toggleSidebar()}></i>
        </div>
      </div>
    )
  }
}

export default Sidebar; 