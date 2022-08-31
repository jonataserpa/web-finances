import React from "react";
import { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

type TVTextFieldProps = TextFieldProps & {
  name: string;
  error: boolean | undefined;
  helperText: boolean | string | undefined;
  type: string;
};

export const VTextField: React.FC<TVTextFieldProps> = ({
  name,
  error,
  helperText,
  type,
  value,
  ...rest
}) => {
  const [valueDefault, setValueDefault] = useState(value || "");

  return (
    <TextField
      {...rest}
      id={name}
      type={type}
      name={name}
      value={valueDefault}
      error={!!error}
      helperText={helperText}
      size="small"
      onChange={(e) => {
        setValueDefault(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        rest.onKeyDown?.(e);
      }}
    />
  );
};
