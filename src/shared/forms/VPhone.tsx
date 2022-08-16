import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
// import { useField } from "@unform/core";
import NumberFormat, { InputAttributes } from "react-number-format";
import { useStyles } from "./styles";

type InputPhoneProps = TextFieldProps & {
  name: string;
  label: string;
  disabled: boolean;
  children?: ReactNode;
  value: string | undefined;
  error: boolean | undefined;
  helperText: boolean | string | undefined;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export function VInputPhone({
  name,
  label,
  disabled,
  value,
  error,
  helperText,
  ...rest
}: InputPhoneProps): JSX.Element {
  const [valueDefault, setValueDefault] = useState(value || "");
  const classes = useStyles();

  return (
    <>
      <FormControl
        required
        error={!!error}
        defaultValue={valueDefault}
        component="fieldset"
      >
        <NumberFormat
          value={valueDefault}
          onChange={(values: any) => {
            setValueDefault(values.target.value);
            rest.onChange?.(values);
          }}
          format="(##) #####-####"
          size="small"
          label={label}
          allowEmptyFormatting
          mask="_"
          customInput={TextField}
          className={
            !!error && (valueDefault === '' || valueDefault === '(__) _____-____') ? classes.inputPhoneError : ""
          }
        />

        {!!error && (valueDefault === '' || valueDefault === '(__) _____-____') && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}
