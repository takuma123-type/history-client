import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from '../atoms/Logo';
import { Link } from 'react-router-dom';

const Header: React.FC<{}> = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Logo />
      </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;