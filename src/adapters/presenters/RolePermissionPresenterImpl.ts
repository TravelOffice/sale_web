import { RoleCreateUpdatePayload } from '@domain/entities/RolePermission';
import {
  addRoleUseCase, getAllPermissionsUseCase, getAllRolesUseCase, updateRoleUseCase,
} from '@domain/useCases';
import { RolePermissionPresenter } from './interfaces/RolePermissionPresenter';

export default class RolePermissionPresenterImpl implements RolePermissionPresenter {
  getAllRoles = async () => getAllRolesUseCase.invoke();

  getAllPermissions = async () => getAllPermissionsUseCase.invoke();

  addRole = async (payload: RoleCreateUpdatePayload) => addRoleUseCase.invoke(payload);

  updateRole = async (payload: RoleCreateUpdatePayload) => updateRoleUseCase.invoke(payload);
}
