import React from 'react';
import { FormValidationData } from '../../shared/types';

interface InputData {
  [k: string]: string;
}

interface ErrorData {
  [k: string]: string;
}

export function useFormWithValidation(inputs: InputData): FormValidationData {
  const [values, setValues] = React.useState<InputData>(inputs || {});
  const [errors, setErrors] = React.useState<ErrorData>({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const form = target.closest('form');
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    if (form) {
      setIsValid(form.checkValidity());
    }
  };

  const resetForm = React.useCallback(
    (newValues: InputData, newErrors: ErrorData, newIsValid: boolean) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
