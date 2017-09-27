import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

const FacebookLogin = ({ facebookLogin, text }) => (
  <Button raised color="primary" onClick={facebookLogin}>
    <i className="fa fa-facebook-official" aria-hidden="true" style={{ fontSize: '18px' }} />{' '}
    <span style={{ marginLeft: '10px' }}>{text}</span>
  </Button>
);

FacebookLogin.propTypes = {
  facebookLogin: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default FacebookLogin;
