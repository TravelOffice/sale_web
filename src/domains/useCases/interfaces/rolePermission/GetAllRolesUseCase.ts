import { Role } from '@domain/entities/RolePermission';

export interface GetAllRolesUseCase {
  invoke: () => Promise<Array<Role>>
}
