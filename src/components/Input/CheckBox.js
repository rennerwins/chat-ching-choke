import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

function CheckBox({ value, label, change, checked }) {
  return <FormControlLabel control={<Checkbox value={value} />} label={label} checked={checked} onChange={change} />;
}

export default CheckBox;
