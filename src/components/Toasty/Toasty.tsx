import React, { ReactNode } from 'react';
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';
import {
  AlertTriangle, Bell, Check, Info, X,
} from 'react-feather';
import { toast } from 'react-toastify';

export type ToastyType = 'success' | 'info' | 'warning' | 'error' | 'default';

export interface ToastyOptions {
  title: string,
  textMuted?: string,
  message: string,
  type: ToastyType,
}

export interface ToastyProps {
  options: ToastyOptions,
}

type ToastTheme = { [key in ToastyType] : { icon: ReactNode, color: AvatarColor } };

const toastyThemes : ToastTheme = {
  success: { icon: <Check size={12} />, color: 'success' },
  info: { icon: <Info size={12} />, color: 'info' },
  warning: { icon: <AlertTriangle size={12} />, color: 'warning' },
  error: { icon: <X size={12} />, color: 'danger' },
  default: { icon: <Bell size={12} />, color: 'primary' },
};

function Toasty(props: ToastyProps) {
  const { options } = props;
  const {
    title, textMuted, message, type,
  } = options;
  const theme = toastyThemes[type];
  const { color, icon } = theme;
  return (
    <>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar status={undefined} size="sm" color={color} icon={icon} />
          <h6 className="toast-title">{title}</h6>
        </div>
        <small className="text-muted">{textMuted}</small>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          👋
          {' '}
          {message}
        </span>
      </div>
    </>
  );
}

const toasty = {
  show: (options: ToastyOptions) => toast(<Toasty options={options} />),
};

export default toasty;
