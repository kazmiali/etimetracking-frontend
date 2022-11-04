import styled from 'styled-components';

export const StyledMenu = styled.nav`
  position: absolute;
  z-index: 1;
  background-color: #58585a;
  min-height: 100vh;
  max-height: 100vh;
  display: none;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) =>
    open ? 'translateX(0)' : 'translateX(-100%)'};

  & > * {
    width: 100%;
  }

  &:hover,
  &:active,
  &:focus {
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #414141;
  }

  &::-webkit-scrollbar-thumb {
    background: #555;
  }

  @media (max-width: 576px) {
    width: 60%;
    display: flex;
  }

  @media (max-width: 1200px) {
    width: 290px;
    display: flex;
  }
`;
