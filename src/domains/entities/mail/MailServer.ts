export type MailServerAuthMethod = 'password' | 'oauth2';

export interface MailServer {
  name: string,
  provider: string,
  incoming: {
    type: string,
    host: string,
    port: number,
    connection_security: string,
    authentication_method: MailServerAuthMethod,
  },
  outgoing: {
    type: string,
    host: string,
    port: number,
    connection_security: string,
    authentication_method: MailServerAuthMethod,
  },
  oauthUrl: string,
}
