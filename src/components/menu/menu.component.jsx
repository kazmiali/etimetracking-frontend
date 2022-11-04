import React from 'react';

import NavLinks from '../nav-links/nav-links.component';
import UserInfo from '../user-info/user-info.component';

import { StyledMenu } from './menu.styles';

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <UserInfo />
      <NavLinks />
    </StyledMenu>
  );
};

export default Menu;
