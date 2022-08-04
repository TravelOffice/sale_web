import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useCallback } from 'react';
import { RequirePermissions } from '@domain/entities/RequirePermissions';
// import { RequirePermissions } from '@domain/entities/RequirePermissions';

export function useIsLoggedIn() {
  return useSelector((state: RootState) => !!state.auth.session);
}

export function useCurrentUser() {
  return useSelector((state: RootState) => state.auth.currentUser);
}

export function useIdToken() {
  return useSelector((state: RootState) => state.auth.idToken);
}

export function useAccessControl() {
  const userPermissions = useSelector(
    (state: RootState) => state.auth.currentUser?.permissions,
  ) || [];
  // Function to check the user has all required permissions
  const can = useCallback((
    ...requiredPermissions: string[]
  ) => requiredPermissions.every((permission) => userPermissions.includes(permission)),
  [userPermissions]);
  // Function to check the user has one of required permissions
  const canAny = useCallback((
    ...permissions: string[]
  ) => permissions.some((permission) => userPermissions.includes(permission)),
  [userPermissions]);
  // Function to check the user can access any component
  const canAccess = useCallback((requiredPermissions: RequirePermissions) => {
    if (Array.isArray(requiredPermissions)) {
      return can(...requiredPermissions);
    }
    if ('all' in requiredPermissions) {
      return requiredPermissions.all.every((permissionStatement) => (typeof permissionStatement === 'string' ? can(permissionStatement) : canAny(...permissionStatement.any)));
    }
    if ('any' in requiredPermissions) {
      return requiredPermissions.any.some((permissionStatement) => (typeof permissionStatement === 'string' ? can(permissionStatement) : can(...permissionStatement.all)));
    }
    return true;
  }, []);
  return {
    userPermissions,
    can,
    canAny,
    canAccess,
  };
}
