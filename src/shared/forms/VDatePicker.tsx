import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useFormikContext } from "formik";

type TVDatePickerProps = TextFieldProps & {
  name: string;
  label: string;
  error: boolean | undefined;
  value: string | undefined | null;
  helperText: boolean | string | undefined;
};
export const VDatePicker: React.FC<TVDatePickerProps> = ({
  name,
  error,
  helperText,
  label,
  value,
  ...rest
}) => {
  const [valueDefault, setValueDefault] = useState(value || "");
  const formik = useFormikContext();

  return (
    <FormControl
      required
      error={!!error && valueDefault === ""}
      defaultValue={valueDefault}
      component="fieldset"
      fullWidth
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => (
            <TextField
              {...rest}
              {...params}
              size="small"
              label={label}
              error={!!error && valueDefault === ""}
              value={valueDefault}
            />
          )}
          onChange={(newValue) => {
            setValueDefault(newValue || "");
            formik.setFieldValue(name, newValue);
          }}
          value={valueDefault}
        />

        {!!error && valueDefault === "" && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </LocalizationProvider>
    </FormControl>
  );
};
