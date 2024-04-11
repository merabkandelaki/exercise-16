import React from 'react';
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  z-index: 1000;
  border: 1px solid #000;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 35px;
  cursor: pointer;
`;

const Modal = ({ children, onClose }) => {
  return (
    <StyledModal>
      {children}
      <CloseButton onClick={onClose}>X</CloseButton>
    </StyledModal>
  );
};

export default Modal;
