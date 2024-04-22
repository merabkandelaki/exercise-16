import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarItem.css";

const NavBarItem = ({ title, to }) => {
  return (
    <NavLink className="nav-link" to={to}>
      {title}
    </NavLink>
  );
};

export default NavBarItem;
