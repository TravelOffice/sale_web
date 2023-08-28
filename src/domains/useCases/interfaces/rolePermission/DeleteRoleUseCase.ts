import { Role } from '@domain/entities/RolePermission';

export interface DeleteRoleUseCase {
  invoke: (roleName: string) => Promise<Role>
}
