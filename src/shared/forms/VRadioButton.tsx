import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextFieldProps,
} from "@mui/material";

type TVRadioButtonProps = TextFieldProps & {
  name: string;
  value: string;
  error: boolean | undefined;
  helperText: boolean | string | undefined;
};
export const VRadioButton: React.FC<TVRadioButtonProps> = ({
  value,
  error,
  helperText,
  ...rest
}) => {
  const [valueDefault, setValueDefault] = useState(value || "");

  return (
    <FormControl
      required
      error={!!error}
      defaultValue={valueDefault}
      component="fieldset"
    >
      <RadioGroup
        row
        aria-label="gender"
        value={valueDefault}
        name="radiogender"
        onChange={(e) => {
          setValueDefault(e.target.value);
          rest.onChange?.(e);
        }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Feminino" />
        <FormControlLabel value="male" control={<Radio />} label="Masculino" />
        <FormControlLabel value="other" control={<Radio />} label="Outro" />

        {!!error && <FormHelperText>{helperText}</FormHelperText>}
      </RadioGroup>
    </FormControl>
  );
};
