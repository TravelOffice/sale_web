import React, { ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Input as ReactstrapInput, InputProps as ReactstrapInputProps } from 'reactstrap';
import { InputType } from 'reactstrap/types/lib/Input';

export interface ControllerInputProps extends ControllerRenderProps {
  id: string,
  placeholder?: string,
  invalid?: boolean,
  type?: InputType,
  children?: ReactNode,
  onBlur: () => void,
  ref: any,
}

export type InputProps = ControllerInputProps | ReactstrapInputProps;

export default function Input(props: InputProps) {
  const { type, ...rest } = props;
  return <ReactstrapInput type={type} {...rest} />;
}
