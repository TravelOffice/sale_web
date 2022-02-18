import {
  AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession,
} from 'amazon-cognito-identity-js';
import AuthorizationError, { AuthorizationErrorCode } from '@adapter/infrastructures/http/AuthorizationError';
import AuthProvider from '@adapter/infrastructures/interfaces/AuthProvider';
import AdminUser, { UserStatus } from '@domain/entities/AdminUser';
import { toAdminUser } from '@utils/CommonUtils';

export default class AuthProviderImpl implements AuthProvider {
  /**
   * Pool data to be used for initializing Cognito user pool object
   * @private
   */
  private poolData = {
    UserPoolId: `${process.env.REACT_APP_USERPOOL_ID}`,
    ClientId: `${process.env.REACT_APP_CLIENT_ID}`,
  };

  /**
   * Cognito user pool that connected to business user pool from AWS Cognito
   * @private
   */
  private readonly userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool(this.poolData);
  }

  /**
   * For initializing new cognito user
   * @param email Email of user
   */
  private getCognitoUser = (email: string): CognitoUser => {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };
    return new CognitoUser(userData);
  };

  /**
   * Current authorized user of browser session
   * @private
   */
  private get currentUser(): CognitoUser | null {
    return this.userPool.getCurrentUser();
  }

  /**
   * Temporary cognito user information for change temporary password
   */
  private temporaryInformation?: { user: CognitoUser, requiredAttributes: any };

  signIn = async (
    email: string,
    password: string,
  ): Promise<CognitoUserSession> => new Promise((resolve, reject) => {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const currentUser = this.getCognitoUser(email);
    const self = this;

    currentUser.authenticateUser(authenticationDetails, {
      onSuccess(res: CognitoUserSession) {
        resolve(res);
      },
      onFailure(error: any) {
        reject(new AuthorizationError(error.code, error.message));
      },
      newPasswordRequired(_: any, requiredAttributes: any) {
        self.temporaryInformation = {
          user: currentUser,
          requiredAttributes,
        };
        reject(new AuthorizationError(AuthorizationErrorCode.ForceChangePassword, ''));
      },
    });
  });

  changeTemporaryPassword = async (
    password: string, confirmedPassword: string,
  ): Promise<boolean> => {
    if (password !== confirmedPassword) {
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    }
    const temporaryUser = this.temporaryInformation?.user;
    if (temporaryUser instanceof CognitoUser) {
      const self = this;
      const clonedAttributes = Object.assign(self.temporaryInformation?.requiredAttributes, {});
      delete clonedAttributes.phone_number_verified;
      delete clonedAttributes.email_verified;
      return new Promise((resolve, reject) => {
        temporaryUser?.completeNewPasswordChallenge(password, clonedAttributes, {
          onFailure(err: any): void {
            reject(err);
          },
          onSuccess(): void {
            self.temporaryInformation = undefined;
            resolve(true);
          },
        });
      });
    }
    return Promise.reject(new Error('Unidentitied CognitoUser object.'));
  };

  changePassword = async (password: string, confirmedPassword: string): Promise<boolean> => {
    // Validate input data
    if (password !== confirmedPassword) {
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    }

    // Call Cognito interface to change password
    const { currentUser } = this;
    if (currentUser) {
      return new Promise((resolve, reject) => {
        currentUser.changePassword(password, confirmedPassword, (error, result) => {
          if (error instanceof Error) reject(error);
          else if (result) resolve(true);
        });
      });
    }
    return Promise.reject(new Error('Unidentitied CognitoUser object.'));
  };

  forgotPassword = async (
    email: string,
  ): Promise<void> => {
    const cognitoUser = this.getCognitoUser(email);
    const self = this;
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onFailure(err: any): void {
          reject(err);
        },
        onSuccess(): void {
          self.temporaryInformation = {
            user: cognitoUser,
            requiredAttributes: null,
          };
          resolve();
        },
      });
    });
  };

  changeForgottenPassword = async (
    verificationCode: string,
    newPassword: string,
  ): Promise<void> => {
    const cognitoUser = this.temporaryInformation?.user;
    const self = this;
    return new Promise((resolve, reject) => {
      cognitoUser?.confirmPassword(verificationCode, newPassword, {
        onFailure(err: any): void {
          reject(err);
        },
        onSuccess(): void {
          self.temporaryInformation = undefined;
          resolve();
        },
      });
    });
  };

  signOut = async () => this.currentUser?.signOut();

  getSession = async (): Promise<CognitoUserSession> => {
    if (this.currentUser instanceof CognitoUser) {
      return new Promise((resolve, reject) => {
        this.currentUser?.getSession((error: any, session: CognitoUserSession) => {
          if (error) {
            reject(error);
          } else {
            resolve(session);
          }
        });
      });
    }
    return Promise.reject(new Error('Unidentitied CognitoUser object.'));
  };

  getAccessToken = async (): Promise<string | null> => {
    const session = await this.getSession();
    return session.getIdToken().getJwtToken();
  };

  getCurrentUser = async (): Promise<AdminUser | undefined> => new Promise((resolve, reject) => {
    const cognitoUser = this.userPool.getCurrentUser();
    if (!cognitoUser) {
      resolve(undefined);
    } else {
      cognitoUser.getSession((error: Error | undefined, session: CognitoUserSession | null) => {
        if (error) {
          reject(error);
        } else {
          resolve(toAdminUser(session!.getIdToken().payload));
        }
      });
    }
  })
}
