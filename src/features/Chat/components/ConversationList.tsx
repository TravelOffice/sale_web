import { Conversation } from '@domain/entities/chat/Conversation';
import React, {
  useCallback, useMemo, useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';
import { Badge, CardText, Collapse } from 'reactstrap';
import { formatDateToMonthShort } from '@utils/DateUtils';
import classnames from 'classnames';
import ConversationAvatar from '@components/Avatar/CustomerAvatar';
import i18n from '@config/i18n';
import { getConversationText, normalizeVietnameseName } from '@utils/ChatUtils';
import { ChevronDown, ChevronRight } from 'react-feather';

export interface ConversationListProps {
  title: string,
  conversations: Conversation[],
  fetching: boolean,
  onConversationSelected: (conversation: Conversation) => void,
  selectedConversation?: Conversation,
  query?: string,
}

const EmptyChats = React.memo(() => (
  <li className="no-results show">
    <h6 className="mb-0">{i18n.t('CHAT.NO_CHAT_FOUND')}</h6>
  </li>
));

/**
 * Skeleton to display when loading conversations. Each skeleton contains 5 row
 * represents 5 chats.
 */
const ConversationSkeleton = React.memo(() => (
  <>
    {
      [1, 2, 3, 4, 5].map((item) => (
        <li key={item}>
          <Skeleton circle width={42} height={42} />
          <div className="chat-info flex-grow-1">
            <Skeleton count={2} width="100%" />
          </div>
        </li>
      ))
    }
  </>
));

function Conversations(props: ConversationListProps) {
  const {
    conversations, onConversationSelected, selectedConversation, query,
  } = props;

  const handleConversationClicked = useCallback((conversation: Conversation) => {
    onConversationSelected(conversation);
  }, [selectedConversation]);

  const filteredConversations = useMemo(() => {
    if (!query) {
      return conversations;
    }
    return conversations.filter((conversation) => {
      const normalizedName = normalizeVietnameseName(conversation.contact.fullName).toLowerCase();
      const normalizedQuery = normalizeVietnameseName(query).toLowerCase();
      return normalizedName.includes(normalizedQuery);
    });
  }, [query, conversations]);

  return (
    <>
      {
        filteredConversations.map((conversation) => {
          const timestamp = conversation.lastMessage?.timestamp || new Date();
          const datetime = formatDateToMonthShort(timestamp);
          const { contact } = conversation;
          return (
            <li
              key={conversation.id}
              onClick={() => handleConversationClicked(conversation)}
              className={classnames({ active: selectedConversation?.id === conversation.id })}
            >
              <ConversationAvatar conversation={conversation} />
              <div className="chat-info flex-grow-1">
                <h5 className="mb-0">{contact.fullName}</h5>
                <CardText className="text-truncate">
                  {getConversationText(conversation)}
                </CardText>
              </div>
              <div className="chat-meta text-nowrap">
                <small className="float-end mb-25 chat-time ms-25">{datetime}</small>
                {conversation.unseenMessages >= 1 && (
                  <Badge className="float-end" color="danger" pill>
                    {conversation.unseenMessages}
                  </Badge>
                )}
              </div>
            </li>
          );
        })
      }
    </>
  );
}

function renderConversations(props: ConversationListProps) {
  const { conversations, fetching } = props;
  if (fetching) {
    return <ConversationSkeleton />;
  }
  if (!conversations || conversations.length === 0) {
    return <EmptyChats />;
  }
  return <Conversations {...props} />;
}

export default function ConversationList(props: ConversationListProps) {
  const { title } = props;
  const [conversationsVisible, setConversationsVisible] = useState<boolean>(true);

  const toggleConversationsContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setConversationsVisible(!conversationsVisible);
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-between cursor-pointer chat-list-header" onClick={toggleConversationsContent}>
        <h4>{title}</h4>
        {conversationsVisible ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      <ul className="chat-users-list chat-list media-list">
        <Collapse isOpen={conversationsVisible}>
          {renderConversations(props)}
        </Collapse>
      </ul>
    </>
  );
}
