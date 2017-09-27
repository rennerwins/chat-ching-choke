import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

function Dropdown({ selection, type, change, label, defaultText }) {
  return (
    <FormControl>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select className="dropdown" value={type} onChange={change} input={<Input id={label} />}>
        <MenuItem disabled>{defaultText || `Select Type`}</MenuItem>
        {selection.map(t => (
          <MenuItem value={t} key={t}>
            {t}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
