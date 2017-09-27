import React from 'react';
import Button from 'material-ui/Button';

function Buttons({ raised, color, disabled, text, click, className, fab, dense, children }) {
  return (
    <Button
      dense={dense}
      fab={fab}
      className={className}
      raised={raised}
      color={color}
      disabled={disabled}
      onClick={click}
    >
      {text || children}
    </Button>
  );
}

export default Buttons;
