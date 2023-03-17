export type ButtonType = 'submit' | 'button';

export interface ButtonProps {
  type: ButtonType;
  label: string;
  onClick?: () => void;
}
