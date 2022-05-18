import classnames from 'classnames';
import React from 'react';
import { Button, ButtonProps, Spinner } from 'reactstrap';

export interface LoadingButtonProps extends ButtonProps {
  loading: boolean,
}

export default function LoadingButton(props: LoadingButtonProps) {
  const {
    loading, children, ...rest
  } = props;
  return (
    <Button {...rest}>
      {loading && (
      <Spinner
        className={classnames({
          'position-relative': true,
          visible: loading,
          invisible: !loading,
        })}
        size="sm"
      />
      )}
      {!loading && (
      <span
        className={classnames({
          invisible: loading,
          visible: !loading,
        })}
      >
        {children}
      </span>
      )}
    </Button>
  );
}
