export enum AuthorizationErrorCode {
  UserNotFound = 'UserNotFoundException',
  NotAuthorized = 'NotAuthorizedException',
  ForceChangePassword = 'ForceChangePassword',
}

export default class AuthorizationError extends Error {
  public code: AuthorizationErrorCode;

  constructor(code: AuthorizationErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}
