import React from "react";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 20px;
`;

function NavBar({ children }) {
  return <StyledNavBar>{children}</StyledNavBar>;
}

export default NavBar;
