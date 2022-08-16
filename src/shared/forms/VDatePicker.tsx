import { useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

type TVDatePickerProps = TextFieldProps & {
  name: string;
  label: string;
  value: string;
  error: boolean | undefined;
  helperText: boolean | string | undefined;
};
export const VDatePicker: React.FC<TVDatePickerProps> = ({ name, error, helperText, label, value, ...rest }) => {
  const [valueDefault, setValueDefault] = useState(value || "");

  return (
    <FormControl
      required
      error={!!error}
      defaultValue={valueDefault}
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
              error={!!error}
              // error={!!error}
            />
          )}
          onChange={(newValue) => {
            setValueDefault(newValue || '');
          }}
          value={valueDefault}
        />

        {!!error && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </LocalizationProvider>
    </FormControl>
  );
};
