
import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { Box, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import NumberFormat, { InputAttributes } from 'react-number-format';

type InputPhoneProps = TextFieldProps & {
    name: string;
    label: string;
    disabled: boolean;
    children?: ReactNode;
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export function VInputPhone({ name, label, disabled, ...rest }: InputPhoneProps): JSX.Element {

    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    const phone = useRef<HTMLInputElement>(null)

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
    }, [registerField, fieldName, value]);

    function handleFocus() {
        if (phone.current) {
            phone.current.focus();
        }
    }

    const NumberFormatCustom = forwardRef<
        NumberFormat<InputAttributes>,
        CustomProps
    >(function NumberFormatCustom(props, ref) {
        const { onChange, ...other } = props;


        return (
            <NumberFormat
                {...other}
                value={value}
                defaultValue={value}
                getInputRef={ref}
                onChange={(values: any) => {
                    setValue(values.value);
                }}
                format="(##) #####-####"
                allowEmptyFormatting mask="_"
            />
        );
    });

    return (
        <>
            <TextField
                {...rest}
                id={name}
                name={name}
                label={label}

                value={value}
                error={!!error}
                helperText={error}
                defaultValue={defaultValue}
                onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
                onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}
                
                InputProps={{
                    inputComponent: NumberFormatCustom as any,
                }}
                variant="outlined"

            />
        </>
    );
}