import { useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useField } from "@unform/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

type TVDatePickerProps = TextFieldProps & {
  name: string;
  label: string;
};
export const VDatePicker: React.FC<TVDatePickerProps> = ({ name, label, ...rest }) => {
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          renderInput={(params) => (
            <TextField
              {...rest}
              {...params}
              size="small"
              label={label}
              error={!!error && (value === "" || !value)}
            />
          )}
          onChange={(newValue) => {
            setValue(newValue);
            rest.onChange?.(newValue);
          }}
          value={value}
        />

        {!!error && (value === "" || !value) && (
          <FormHelperText>{error}</FormHelperText>
        )}
      </LocalizationProvider>
    </FormControl>
  );
};
