import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';

function Title({ title }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Logo />
      <h1 style={{ fontWeight: 700 }}>{title}</h1>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
