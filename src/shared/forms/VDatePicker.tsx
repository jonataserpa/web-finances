import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

type TVDatePickerProps = TextFieldProps & {
  name: string;
}
export const VDatePicker: React.FC<TVDatePickerProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
    
  }, [registerField, fieldName, value]);


  return (

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(params) => <TextField
          {...rest}
          {...params}
          
          error={!!error && value === '' && !value}
          helperText={value === '' ? error : ''}
          defaultValue={defaultValue}

          value={value} 
          onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
          onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }} />}

          onChange={(newValue) => { setValue(newValue); rest.onChange?.(newValue); }}
          value={value} />
    </LocalizationProvider>

  );
};
