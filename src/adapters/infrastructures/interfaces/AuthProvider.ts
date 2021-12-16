import { CognitoUserSession } from 'amazon-cognito-identity-js';
import AdminUser from '@domain/entities/AdminUser';

export default interface AuthProvider {
  signIn: (username: string, password: string) => Promise<CognitoUserSession>

  changeTemporaryPassword : (password: string, confirmedPassword: string) => Promise<boolean>

  changePassword: (password: string, confirmedPassword: string) => Promise<boolean>

  forgotPassword: (email: string) => Promise<void>

  changeForgottenPassword: (verificationCode: string, newPassword: string) => Promise<void>

  signOut: () => Promise<void>

  getSession: () => Promise<CognitoUserSession>

  getAccessToken: () => Promise<string | null>

  getCurrentUser: () => Promise<AdminUser | undefined>
}
