export interface MessageData {
  text: string,
}

export interface Message {
  id: string,
  customerId: string,
  messageData: MessageData,
  recipient: string,
  sender: string,
  timestamp: Date,
}
