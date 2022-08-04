import { ReactNode } from 'react';
import { RequirePermissions } from '@domain/entities/RequirePermissions';

export interface RouteMetadata {
  navLink: string,
}

export interface RoutePathConfig {
  path: string,
  exact?: boolean,
  appLayout?: boolean,
  className?: string,
  component: ReactNode,
  meta?: RouteMetadata,
  requiredPermissions?: RequirePermissions,
  fallback?: JSX.Element
}

export interface RouteGroupConfig {
  path: string,
  group: RouteConfig[],
  default: string,
}

export type RouteConfig = RoutePathConfig | RouteGroupConfig;
