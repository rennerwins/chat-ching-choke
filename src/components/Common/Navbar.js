import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

const Span = styled.span`
  color: #fff;
  text-decoration: none;
`;

function Navbar({ logout }) {
  return (
    <AppBar position="fixed" style={{ backgroundColor: '#424242' }}>
      <Toolbar>
        <Typography type="title" color="inherit" style={{ flex: 1 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Span>Home</Span>
          </Link>
        </Typography>

        {localStorage.isAdmin && (
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <Button color="contrast">
              <Span>Admin</Span>
            </Button>
          </Link>
        )}

        {localStorage.isLogin && (
          <Button onClick={logout} color="contrast">
            <Span>Logout</Span>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navbar;
