import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
  const selected = {
    color: 'orange'
  }
  return (
    <nav>
      <NavLink activeStyle={selected} exact to="/">Home</NavLink> | 
      <NavLink activeStyle={selected} to="/courses">Courses</NavLink> | 
      <NavLink activeStyle={selected} to="/about">About</NavLink>
    </nav>
  );
}

export default Header;