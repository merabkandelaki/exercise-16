import React from "react";
import "./NavBar.css";

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export default NavBar;
