import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

function LinkButton({ to, raised, color, text }) {
  return (
    <Link to={to}>
      <Button raised={raised} color={color}>
        {text}
      </Button>
    </Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  raised: PropTypes.bool,
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default LinkButton;
