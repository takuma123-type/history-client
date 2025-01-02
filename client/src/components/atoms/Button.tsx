import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

interface ButtonProps extends MUIButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <MUIButton {...props}>
      {label}
    </MUIButton>
  );
};

export default Button;