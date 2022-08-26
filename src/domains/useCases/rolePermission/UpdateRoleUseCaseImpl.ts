import { rolePermissionRepository } from '@adapter/repositories';
import { Role, RoleCreateUpdatePayload } from '@domain/entities/RolePermission';
import { UpdateRoleUseCase } from '../interfaces/rolePermission/UpdateRoleUseCase';

export default class UpdateRoleUseCaseImpl implements UpdateRoleUseCase {
  invoke = async (
    role: RoleCreateUpdatePayload,
  ): Promise<Role> => rolePermissionRepository.updateRole(role);
}
