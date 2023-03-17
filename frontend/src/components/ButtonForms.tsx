import type { ButtonProps } from '../entities/buttonType';
import type { FC } from 'react';

const ButtonForms: FC<ButtonProps> = function ({ type, label, onClick }) {
  return (
    <button type={type} className="btn btn-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonForms;
