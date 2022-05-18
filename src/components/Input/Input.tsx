import React, { ReactNode } from 'react';

import { ControllerRenderProps } from 'react-hook-form';
import { Input as ReactstrapInput, InputProps as ReactstrapInputProps } from 'reactstrap';

export interface ControllerInputProps extends ControllerRenderProps {
  id: string,
  children?: ReactNode,
  onBlur: () => void,
}

export type InputProps = ControllerInputProps & ReactstrapInputProps;
interface InputHandles {}

const Input = React.forwardRef<InputHandles, InputProps>((props) => {
  const { ...rest } = props;
  return <ReactstrapInput {...rest} />;
});

export default Input;
