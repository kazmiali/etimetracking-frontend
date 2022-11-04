import styled from 'styled-components';

export const StyledBurger = styled.button`
  position: absolute;
  top: 2%;
  left: 1.2rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 1.8rem;
  height: 1.8rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 1.9rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? '#0D0C1D' : '#FFFFFF')};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) =>
        open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) =>
        open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) =>
        open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  img {
    width: 120px;
    height: 50px;
  }

  @media (max-width: 1200px) {
    display: flex;
  }
`;
