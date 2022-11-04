import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { StyledBurger } from './burger.styles';

const Burger = ({ open, setOpen }) => {
  return (
    <Fragment>
      <header className='header'>
        <NavLink to='/'>
          <img
            className=''
            src={require('../../assets/mainlogo.png')}
            alt=''
          />
        </NavLink>
      </header>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </Fragment>
  );
};

export default Burger;
