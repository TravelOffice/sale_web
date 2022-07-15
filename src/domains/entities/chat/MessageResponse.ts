export interface MessageResponse {
  customerId: string,
  id: string,
  recipient: string,
  sender: string,
  messageData: string,
  timestamp?: string,
}
