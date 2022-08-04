import React from 'react';
import { AccessControlProps } from '@components/AccessControl/AccessControlProps';
import AccessControl from '@components/AccessControl/AccessControl';
import NotAuthorized from '@components/NotAuthorized/NotAuthorized';

export default function PageAccessControl(props: AccessControlProps) {
  const { fallback = <NotAuthorized />, children, ...rest } = props;
  return (
    <AccessControl fallback={fallback} {...rest}>
      {children}
    </AccessControl>
  );
}
