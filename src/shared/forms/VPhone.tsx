import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useField } from "@unform/core";
import NumberFormat, { InputAttributes } from "react-number-format";
import { useStyles } from "./styles";

type InputPhoneProps = TextFieldProps & {
  name: string;
  label: string;
  disabled: boolean;
  children?: ReactNode;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export function VInputPhone({
  name,
  label,
  disabled,
  ...rest
}: InputPhoneProps): JSX.Element {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [value, setValue] = useState(defaultValue || "");

  const classes = useStyles();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <>
      <FormControl
        required
        error={!!error && (value === "" || !value)}
        defaultValue={defaultValue}
        component="fieldset"
      >
        <NumberFormat
          value={value}
          onChange={(values: any) => {
            setValue(values.target.value);
            rest.onChange?.(values);
          }}
          format="(##) #####-####"
          size="small"
          label={label}
          allowEmptyFormatting
          mask="_"
          customInput={TextField}
          className={
            !!error && (value === "" || !value) ? classes.inputPhoneError : ""
          }
        />

        {!!error && (value === "" || !value) && (
          <FormHelperText>{error}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}
