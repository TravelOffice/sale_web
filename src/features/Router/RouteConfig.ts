import { ReactNode } from 'react';

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
}

export interface RouteGroupConfig {
  path: string,
  group: RouteConfig[],
  default: string,
}

export type RouteConfig = RoutePathConfig | RouteGroupConfig;
