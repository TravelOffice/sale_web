export interface FacebookMessage {
  id: string,
  created_time: string,
  from: {
    id: string,
    email: string,
    name: string,
  },
  message: string,
  to: {
    data: Array<{
      id: string,
      email: string,
      name: string,
    }>
  }
}
