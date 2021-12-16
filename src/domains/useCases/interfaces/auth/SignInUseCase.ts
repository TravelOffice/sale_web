import AdminUser from '@domain/entities/AdminUser';

export default interface SignInUseCase {
  signIn: (username: string, password: string) => Promise<AdminUser>,
}
