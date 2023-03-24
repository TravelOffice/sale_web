export interface AutoLinkEmailRequest {
  name: string,
  email: string,
  password?: string,
  code?: string,
  state?: string,
}
