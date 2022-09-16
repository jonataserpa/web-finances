import React from "react";
import { ReactNode, useState } from "react";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextFieldProps,
  InputLabel,
} from "@mui/material";
import { useStyles } from "./styles";
import { useFormikContext } from "formik";

interface IStatus {
  id: number;
  name: string;
  value: string;
}

type SelectStatusProps = TextFieldProps & {
  name: string;
  label: string;
  disabled: boolean;
  children?: ReactNode;
  value: string | undefined;
  error: boolean | undefined;
  helperText: boolean | string | undefined;
  items: IStatus[];
};

export function VSelectStatus({
  name,
  label,
  value,
  error,
  helperText,
  items,
  ...rest
}: SelectStatusProps): JSX.Element {
  const [valueDefault, setValueDefault] = useState(value || "");
  const classes = useStyles();
  const formik = useFormikContext();

  return (
    <>
      <FormControl
        error={!!error}
        defaultValue={valueDefault}
        component="fieldset"
        fullWidth
      >
        <InputLabel id={name}>{label}</InputLabel>

        <Select
          labelId={name}
          id={name}
          value={valueDefault}
          size="small"
          label={label}
          name={name}
          variant="outlined"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(values: any) => {
            setValueDefault(values.target.value);
            rest.onChange?.(values);
            formik.setFieldValue(name, values.target.value);
          }}
          className={
            !!error && valueDefault === "" ? classes.inputPhoneError : ""
          }
        >
          {items &&
            items.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
        </Select>

        {!!error && valueDefault === "" && (
          <FormHelperText id={name}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}
