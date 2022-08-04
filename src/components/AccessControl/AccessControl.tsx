import React from 'react';
import { useAccessControl } from '@hooks/auth';
import { AccessControlProps } from '@components/AccessControl/AccessControlProps';

/**
 * Component for access control. To prevent access to any component, just wrap
 * it by this component within `requiredPermissions` property.
 * For example:
 * <AccessControl requiredPermissions={[['user.read.any', 'user.write.any']]}>
 *   <SomeComponent />
 * </AccessControl>
 *
 * @param props:
 * - requiredPermissions: 2-dimensions array, described as:
 *  + each row means the user must have all permissions of this row. It's same as AND operation
 *  + the user can access the component if he/she satisfy the one of conditions. It's same as OR
 *    operation
 * For instance:
 * Component A has requiredPermission is [
 *  ['user.read.own', 'user.write.own'],
 *  ['user.read.any']
 * ]
 * A user with 'user.read.any' can access the Component A, but another with 'user.read.own'
 * can't.
 */
export default function AccessControl(props: AccessControlProps) {
  const { requiredPermissions, children, fallback = <></> } = props;
  const { canAccess } = useAccessControl();
  const access = canAccess(requiredPermissions);
  if (access) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}
