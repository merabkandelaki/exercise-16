import React from "react";
import "./NavBarItem.css";
import { NavLink } from "react-router-dom";

const NavBarItem = ({ title, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "NavBarItem active" : "NavBarItem"
      }
    >
      {title}
    </NavLink>
  );
};

export default NavBarItem;
