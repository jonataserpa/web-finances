import { useEffect, useRef, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";

type TVTextFieldProps = TextFieldProps & {
  name: string;
};
interface InputValueReference {
  value: string;
}
export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);
  const [value, setValue] = useState(defaultValue || "");
  let msg='';

  if (fieldName === 'address.0.adrees' && value === '') {
    msg = 'Campo obrigatório';
  }
  
  if (fieldName === 'address.1.adrees' && value === '') {
    msg = 'Campo obrigatório';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      id={name}
      name={name}
      error={!!error || msg !== ''}
      helperText={error || msg}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
      ref={inputElementRef}
    />
  );
};
