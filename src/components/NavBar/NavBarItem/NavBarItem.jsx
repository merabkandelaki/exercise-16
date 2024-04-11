import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(RouterNavLink)`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: gray;
    color: white;
  }

  &.active {
    background-color: gray;
    color: white;
  }
`;

const NavBarItem = ({ title, to }) => {
  return <NavLink to={to}>{title}</NavLink>;
};

export default NavBarItem;
