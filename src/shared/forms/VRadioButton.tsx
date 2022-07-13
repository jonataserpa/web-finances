import { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useField } from "@unform/core";

type TVRadioButtonProps = TextFieldProps & {
  name: string;
};
export const VRadioButton: React.FC<TVRadioButtonProps> = ({
  name,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <FormControl
      required
      error={!!error}
      defaultValue={defaultValue}
      component="fieldset"
    >
      <RadioGroup
        row
        aria-label="gender"
        value={value}
        name="radiogender"
        onChange={(e) => {
          setValue(e.target.value);
          rest.onChange?.(e);
        }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Feminino" />
        <FormControlLabel value="male" control={<Radio />} label="Masculino" />
        <FormControlLabel value="other" control={<Radio />} label="Outro" />

        {!!error && (value === "" || !value) && (
          <FormHelperText>{error}</FormHelperText>
        )}
      </RadioGroup>
    </FormControl>
  );
};
