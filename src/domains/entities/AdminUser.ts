export type UserStatus = 'online' | 'offline' | 'busy' | 'away';

export default interface AdminUser {
  id: string,
  username: string,
  role: string,
  avatar: string,
  fullName: string,
  status: UserStatus,
  about?: string,
}
