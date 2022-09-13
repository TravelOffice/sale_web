import React, { forwardRef, ReactNode, useState } from 'react';
import {
  Input, InputGroup, InputGroupProps, InputGroupText,
} from 'reactstrap';
import classNames from 'classnames';
import { Eye, EyeOff } from 'react-feather';

export interface InputPasswordToggleProps extends InputGroupProps {
  invalid: boolean,
  hideIcon?: ReactNode,
  showIcon?: ReactNode,
  visible: boolean,
  inputClassName?: string,
}

const InputPasswordToggle = forwardRef<Input, InputPasswordToggleProps>((componentProps, ref) => {
  const {
    invalid, className, visible, placeholder, inputClassName, size, iconSize = 16,
    ...rest
  } = componentProps;
  const {
    hideIcon = <Eye size={iconSize} />,
    showIcon = <EyeOff size={iconSize} />,
  } = componentProps;
  const [inputVisibility, setInputVisibility] = useState<boolean>(visible);
  return (
    <InputGroup className={classNames(className, { 'is-invalid': invalid })} size={size}>
      <Input
        ref={ref}
        invalid={invalid}
        type={inputVisibility ? 'text' : 'password'}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
      <InputGroupText className="cursor-pointer" onClick={() => setInputVisibility(!inputVisibility)}>
        {
          inputVisibility ? hideIcon : showIcon
        }
      </InputGroupText>
    </InputGroup>
  );
});

export default InputPasswordToggle;
