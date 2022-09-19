export interface MailApiResponse<T extends any> {
  code: string,
  message: string,
  data?: T
}
