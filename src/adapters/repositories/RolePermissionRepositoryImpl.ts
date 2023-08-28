import { apiProvider } from '@adapter/infrastructures';
import { RoleCreateUpdatePayload } from '@domain/entities/RolePermission';
import RolePermissionRepository from './interfaces/RolePermissionRepository';

export default class RolePermissionRepositoryImpl implements RolePermissionRepository {
  getAllRoles = async () => {
    const response = await apiProvider.authorizedRequest.get('/admin/roles');
    return response.data;
  }

  getAllPermissions = async () => {
    const response = await apiProvider.authorizedRequest.get('/admin/permissions');
    return response.data;
  }

  addRole = async (role: RoleCreateUpdatePayload) => {
    const response = await apiProvider.authorizedRequest.post('/admin/roles', role);
    return response.data;
  }

  updateRole = async (role: RoleCreateUpdatePayload) => {
    const { name, ...updateRole } = role;
    const response = await apiProvider.authorizedRequest.put(`/admin/roles/${name}`, updateRole);
    return response.data;
  }

  deleteRole = async (roleName: string) => {
    const response = await apiProvider.authorizedRequest.delete(`/admin/roles/${roleName}`);
    return response.data;
  }
}
