import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  buttonOneTitle: string;
  buttonTwoTitle: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  width: 40%;
  max-width: 400px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, buttonOneTitle, buttonTwoTitle, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{title}</h2>
        <p>{children}</p>
        <ButtonContainer>
           <button onClick={onClose}>{buttonTwoTitle}</button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
