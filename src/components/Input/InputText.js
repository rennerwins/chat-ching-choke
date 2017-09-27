import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

function InputText({ label, placeholder, change, value, required, error, helperText, fullWidth, type, max, min }) {
  return (
    <TextField
      required={required}
      error={error}
      label={label}
      margin="normal"
      value={value}
      onChange={change}
      placeholder={placeholder}
      helperText={helperText}
      fullWidth={fullWidth}
      type={type || 'text'}
      max={max}
      min={min}
    />
  );
}

InputText.propTypes = {
  change: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default InputText;
