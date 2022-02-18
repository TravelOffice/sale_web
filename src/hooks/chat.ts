import { useEffect, useState } from 'react';
import { Message } from '@domain/entities/Message';
import { Conversation } from '@domain/entities/Conversation';
import { SendMessageRequestParams } from '@domain/entities/SendMessageRequestParams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { chatActions } from '@redux/slices/chatSlice';
import { FetchResult, useLazyQuery, useMutation } from '@apollo/client';
import { MessageResponse } from '@domain/entities/MessageResponse';
import { toMessage } from '@utils/mapper/MessageMapper';
import { sendMessage } from '@graphql/mutations';
import { onNewMessage } from '@graphql/subscriptions';
import { allMessages } from '@graphql/queries';
import client from '../graphql/client';

export const useConversations = () : [Conversation[], boolean] => {
  const conversations = useSelector((state: RootState) => state.chat.conversations);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    setTimeout(() => {
      const list = [{
        id: '2222',
        unseenMessages: 1,
        contact: {
          id: 'contact1',
          avatar: 'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
          fullName: 'Felecia Rower',
          about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
        },
        lastMessage: {
          customerId: '2222',
          sender: 'customer1',
          messageData: { text: 'Hi' },
          recipient: '1111',
          timestamp: new Date(),
        },
      }, {
        id: 'cus2',
        unseenMessages: 1,
        contact: {
          id: 'contact1',
          avatar: 'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
          fullName: 'Felecia Rower 2',
          about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
        },
        lastMessage: {
          customerId: '2222',
          sender: 'customer1',
          messageData: { text: 'Hi' },
          recipient: '1111',
          timestamp: new Date(),
        },
      }];
      dispatch(chatActions.onConversationsRetrieved(list));
      setFetching(false);
    }, 100);
  }, []);
  return [conversations, fetching];
};

export type SendMessageRequest = (params: SendMessageRequestParams) => void;

export const useMessages = (
  customerId?: string,
) : [Message[], SendMessageRequest] => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [getMessagesQuery] = useLazyQuery(allMessages);
  const [sendMessageMutation] = useMutation(sendMessage);
  const dispatch = useDispatch();

  // Query to get all messages by customerId
  useEffect(() => {
    if (customerId) {
      getMessagesQuery({ variables: { customerId } }).then((value) => {
        const messageResponses : MessageResponse[] = value.data.allMessages.data;
        const list : Message[] = messageResponses.map((response) => toMessage(response));
        setMessages(list);
      });
    }
  }, [customerId]);

  // Subscribe onNewMessage event to update conversation list / chat log
  useEffect(() => {
    const obs = client.subscribe({ query: onNewMessage }).subscribe({
      next(value: FetchResult<any>) {
        const response : MessageResponse = value.data.onNewMessage.data;
        const message = toMessage(response);
        if (message.customerId === customerId) {
          setMessages(messages.concat(message));
        } else {
          dispatch(chatActions.onNewConversation({
            id: message.customerId,
            unseenMessages: 1,
            contact: {
              id: `${message.customerId}`,
              avatar: 'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              fullName: 'Felecia Rower',
              about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
            },
            lastMessage: message,
          }));
        }
      },
    });
    return () => {
      obs.unsubscribe();
    };
  }, [messages, customerId]);

  // Send a message
  const dispatchSendMessage = (params: SendMessageRequestParams) => {
    sendMessageMutation({ variables: params }).then((value) => {
      const response : MessageResponse = value.data.sendMessage.data;
      const message = toMessage(response);
      setMessages(messages.concat(message));
    });
  };
  return [messages, dispatchSendMessage];
};
