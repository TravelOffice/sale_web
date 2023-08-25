import React, {
  MouseEventHandler, useEffect, useMemo, useState,
} from 'react';
import { Conversation } from '@domain/entities/chat/Conversation';
import { userPresenter } from '@adapter/presenters';
import { User } from '@domain/entities/User';
import {
  Check, Edit2, Users, UserX, X,
} from 'react-feather';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Select, { Props } from 'react-select';
import { CSSObjectWithLabel } from 'react-select/dist/declarations/src/types';
import { useDispatch } from 'react-redux';
import { chatActions } from '@redux/slices/chatSlice';
import { generateUserDisplayName } from '@utils/UserUtils';

interface ManualAssignChatProps {
  conversation: Conversation
}

interface UserOption {
  label: string,
  value: string,
}

// Custom styles for assignee select
const customStyles = {
  control: (base: CSSObjectWithLabel, _props: Props) => ({
    ...base,
    minWidth: 200,
  }),
};

export default function ManualAssignChat(props: ManualAssignChatProps) {
  // Hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Props
  const { conversation } = props;
  const { assignee } = conversation;

  // States
  const [users, setUsers] = useState<User[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<string | undefined>(assignee);
  const assignedUser = users.find((user) => user.username === assignee);
  const userSelectOptions: UserOption[] = users.map((user) => ({
    value: user.username,
    label: generateUserDisplayName(user),
  }));
  const defaultUserOption = userSelectOptions.find((user) => user.value === assignee);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  /**
   * Check whether conversation is assigned to sale user
   */
  const isConversationAssigned = () => assignedUser && assignee !== null && assignee !== '';

  /**
   * Get the name that is shown as assigned username. Returns:
   * - Full name if user information was fetched
   * - Username if user information is empty
   */
  const getAssignedEmployeeName = () => {
    if (assignedUser) {
      return `${assignedUser.firstName} ${assignedUser.lastName}`;
    }
    return assignee;
  };

  const onUpdateAssignee: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsEditing(false);
    if (selectedAssignee) {
      dispatch(chatActions.assignChat([conversation, selectedAssignee]));
    }
  };

  useMemo(() => {
    setIsLoading(true);
    // Get users list
    userPresenter
      .getAllUsers()
      .then((fetchedUsers) => {
        // Toggle loading
        setIsLoading(false);
        // Ignore `root` user
        setUsers(fetchedUsers.filter((user) => user.roles.includes('SALE')));
      });
  }, []);

  useEffect(() => {
    // Reset data
    setIsLoading(false);
    setIsEditing(false);
  }, [conversation]);

  return (
    <>
      {
        !isLoading && (
          <div className="ms-1 d-flex align-items-center">
            {!isConversationAssigned() && !isEditing && (
              <Badge
                style={{ marginRight: 4 }}
                color="light-warning"
                pill
              >
                <UserX className="me-50" />
                {t('CHAT.MANUAL_ASSIGN.CHAT_NOT_ASSIGNED')}
              </Badge>
            )}
            {isConversationAssigned() && !isEditing && (
              <div style={{ marginRight: 4 }}>
                <Badge id="assigned-name" color="light-primary" pill>
                  <Users className="me-50" />
                  {getAssignedEmployeeName()}
                </Badge>
                <UncontrolledTooltip placement="right" target="assigned-name">
                  {t('CHAT.MANUAL_ASSIGN.CHAT_ASSIGNED_USER_TOOLTIP', { name: `${assignedUser?.firstName || assignee}` })}
                </UncontrolledTooltip>
              </div>
            )}
            {/* Editing section */}
            {
              isEditing && (
                <div style={{ marginRight: 4 }}>
                  <Select
                    styles={customStyles}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={defaultUserOption}
                    name="assignee-chooser"
                    options={userSelectOptions}
                    placeholder={t('CHAT.MANUAL_ASSIGN.CHOOSE_ASSIGNEE_DROPDOWN_TITLE')}
                    onChange={(newValue, _) => {
                      const newAssignee = newValue?.value;
                      setSelectedAssignee(newAssignee);
                    }}
                  />
                </div>
              )
            }
            {
              isEditing ? (
                <>
                  <X
                    style={{ marginRight: 4 }}
                    className="cursor-pointer text-danger"
                    size={20}
                    onClick={() => setIsEditing(!isEditing)}
                  />
                  <Check className="cursor-pointer text-success" size={20} onClick={onUpdateAssignee} />
                </>
              ) : <Edit2 className="cursor-pointer" size={16} onClick={() => setIsEditing(!isEditing)} />
            }
          </div>
        )
      }
    </>
  );
}
