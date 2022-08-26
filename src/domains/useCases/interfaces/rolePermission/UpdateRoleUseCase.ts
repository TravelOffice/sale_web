import { Role, RoleCreateUpdatePayload } from '@domain/entities/RolePermission';

export interface UpdateRoleUseCase {
  invoke: (role: RoleCreateUpdatePayload) => Promise<Role>
}
