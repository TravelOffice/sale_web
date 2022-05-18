import React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Spinner(props: SpinnerProps) {
  const { className, ...rest } = props;
  return (
    <div className={`fallback-spinner ${className}`} {...rest}>
      <div className="loading">
        <div className="effect-1 effects" />
        <div className="effect-2 effects" />
        <div className="effect-3 effects" />
      </div>
    </div>
  );
}
