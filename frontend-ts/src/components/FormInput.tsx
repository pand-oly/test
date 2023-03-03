import { validate } from '../middleware/validateAccess';
import { useState, useEffect } from 'react';

type FormInputProps = {
  id: string;
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
};

export default function FormInput(props: FormInputProps) {
  const { id, label, name, type, value, onChange, errorMessage } = props;

  const [inputClass, setInputClass] = useState('');

  useEffect(() => {
    if (value.length > 0) {
      if (validate(name, value)) {
        setInputClass('is-valid');
      } else {
        setInputClass('is-invalid');
      }
    }
  }, [value, name]);

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        className={`form-control ${inputClass}`}
      />
      {errorMessage && <span className="invalid-feedback">{errorMessage}</span>}
    </div>
  );
}
