export interface RequireAllPermissions {
  all: (string | { any: string[] })[],
}

export interface RequireAnyPermissions {
  any: (string | { all: string[] })[],
}

export type RequirePermissions = string[] | RequireAllPermissions | RequireAnyPermissions | {};
