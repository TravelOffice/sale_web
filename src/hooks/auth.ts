import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useCallback, useEffect } from 'react';
import { RequirePermissions } from '@domain/entities/RequirePermissions';
import { getSSOPage } from '@utils/EnvUtils';
import EventMessageType from '@domain/entities/event/EventMassageType';

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

/**
 * Hook to listen event which is emitted from SSO page
 */
export function useSsoEvent<T extends any>(type: EventMessageType, effect: (data: T) => void) {
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      // Skip event from other origin
      if (event.origin !== getSSOPage()) {
        return;
      }
      type SsoMessageEventData = { type: EventMessageType, data: T };
      const message: SsoMessageEventData = event.data;
      // Handle matched event
      if (message.type === type) {
        effect(message.data);
      }
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);
}
