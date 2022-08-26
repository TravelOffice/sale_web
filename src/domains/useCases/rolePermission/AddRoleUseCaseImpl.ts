import { rolePermissionRepository } from '@adapter/repositories';
import { Role, RoleCreateUpdatePayload } from '@domain/entities/RolePermission';
import { AddRoleUseCase } from '../interfaces/rolePermission/AddRoleUseCase';

export default class AddRoleUseCaseImpl implements AddRoleUseCase {
  invoke = async (
    role: RoleCreateUpdatePayload,
  ): Promise<Role> => rolePermissionRepository.addRole(role);
}
