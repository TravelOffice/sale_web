export interface MessageData {
  text: string,
}

export interface Message {
  customerId: string,
  messageData: MessageData,
  recipient: string,
  sender: string,
  timestamp: Date,
}
