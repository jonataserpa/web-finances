import { useEffect, useRef, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useVForm } from "./useVForm";
import { useSelector } from "react-redux";
import { ICombineState } from "../../store/reducers";
import { IAdresses } from "../../features/user/interfaces/IAdresses";

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
  let msg = "";

  const { send, address } = useSelector((state: ICombineState) => state.user);
  const validate = useRef<boolean>(send);
  validate.current = send;

  /**
   * Validate address fields dinamic
   * @param adr
   */
  function validateAddress(adr: IAdresses) {
    if (adr.cep !== undefined && name === "cep") {
      adr.cep = value;
      if (adr.cep !== "") {
        validate.current = false;
        msg = "";
      }
    }
    
    if (adr.adrees !== undefined && name === "adrees") {
      adr.adrees = value;
      if (adr.adrees !== "") {
        validate.current = false;
        msg = "";
      }
    }
    
    if (adr.number_end !== undefined && name === "number_end") {
      adr.number_end = value;
      if (adr.number_end !== "") {
        validate.current = false;
        msg = "";
      }
    }
    
    if (adr.state !== undefined && name === "state") {
      adr.state = value;
      if (adr.state !== "") {
        validate.current = false;
        msg = "";
      }
    }
   
    if (adr.city !== undefined && name === "city") {
      adr.city = value;
      if (adr.city !== "") {
        validate.current = false;
        msg = "";
      }
    }
  }

  if (address && address.length > 0 && send) {
    address?.map((adr) => {
      msg = "Campo obrigatório";      
      validateAddress(adr);
    });
  }

  if (fieldName === name && send) {
    msg = error ? error : "Campo obrigatório";
    if (value !== "" && value !== undefined) {
      validate.current = false;
      msg = error ? error : "";
    }
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
      error={!!error || validate.current}
      helperText={error || msg}
      defaultValue={defaultValue}
      value={value}
      size="small"
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
