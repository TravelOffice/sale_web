export interface ZaloPageRepository {
  getOAuthLink: () => Promise<string>
}
