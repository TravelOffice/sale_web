import { ReactNode } from 'react';
import { RequirePermissions } from '@domain/entities/RequirePermissions';

export interface AccessControlProps {
  requiredPermissions: RequirePermissions,
  children: ReactNode,
  fallback?: JSX.Element,
}
