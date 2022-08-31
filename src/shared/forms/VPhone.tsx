import React from "react";
import { ReactNode, useState } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
// import { useField } from "@unform/core";
import NumberFormat from "react-number-format";
import { useStyles } from "./styles";
import { useFormikContext } from "formik";

type InputPhoneProps = TextFieldProps & {
  name: string;
  label: string;
  disabled: boolean;
  children?: ReactNode;
  value: string | undefined;
  error: boolean | undefined;
  helperText: boolean | string | undefined;
};

export function VInputPhone({
  name,
  label,
  value,
  error,
  helperText,
  ...rest
}: InputPhoneProps): JSX.Element {
  const [valueDefault, setValueDefault] = useState(value || "");
  const classes = useStyles();
  const formik = useFormikContext();

  return (
    <>
      <FormControl
        required
        error={!!error}
        defaultValue={valueDefault}
        component="fieldset"
        fullWidth
      >
        <NumberFormat
          value={valueDefault}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(values: any) => {
            setValueDefault(values.target.value);
            rest.onChange?.(values);
            formik.setFieldValue(name, values.target.value);
          }}
          format="(##) #####-####"
          size="small"
          label={label}
          name={name}
          allowEmptyFormatting
          mask="_"
          aria-describedby={name}
          customInput={TextField}
          variant="outlined"
          className={
            !!error &&
            (valueDefault === "" || valueDefault === "(__) _____-____")
              ? classes.inputPhoneError
              : ""
          }
        />

        {!!error &&
          (valueDefault === "" || valueDefault === "(__) _____-____") && (
            <FormHelperText id={name}>{helperText}</FormHelperText>
          )}
      </FormControl>
    </>
  );
}
