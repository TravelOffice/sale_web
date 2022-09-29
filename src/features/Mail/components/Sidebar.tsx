import React, { ReactNode, useCallback, useState } from 'react';
import classnames from 'classnames';
import {
  Badge, Button, ListGroup, ListGroupItem, UncontrolledTooltip,
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Edit2, Info, Mail, Send, Settings, Star, Trash, User,
} from 'react-feather';
import { useMailboxes, useSelectedMailAccount, useSelectedMailbox } from '@hooks/mail';
import { capitalizeFirstLetter } from '@utils/CommonUtils';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import Skeleton from 'react-loading-skeleton';
import { RootState } from '@redux/store';
import SwitchAccountModal from '@features/Mail/components/SwitchAccountModal';
import { numberArrayOf } from '@utils/ArrayUtils';
import { useTranslation } from 'react-i18next';

export interface SidebarProps {
  sidebarOpen: boolean,
}

const mailIcons: Record<string, ReactNode> = {
  inbox: <Mail size={18} className="me-75" />,
  sent: <Send size={18} className="me-75" />,
  draft: <Edit2 size={18} className="me-75" />,
  starred: <Star size={18} className="me-75" />,
  spam: <Info size={18} className="me-75" />,
  delete: <Trash size={18} className="me-75" />,
};

function MailboxesSkeleton() {
  return (
    <ListGroup className="list-group-messages">
      {
        numberArrayOf(5).map((key) => (
          <ListGroupItem key={key}><Skeleton /></ListGroupItem>
        ))
      }
    </ListGroup>
  );
}

export default function Sidebar(props: SidebarProps) {
  const { sidebarOpen } = props;

  const [showAccountModal, setShowAccountModal] = useState(false);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const mailAccount = useSelectedMailAccount();
  const selectedMailbox = useSelectedMailbox();
  const mailboxes = useMailboxes();
  const isFetchingMailboxes = useSelector((state: RootState) => state.mail.isFetchingMailboxes);
  const onMailboxSelected = useCallback((mailbox: string) => {
    dispatch(mailActions.selectMailbox(mailbox));
  }, []);
  return (
    <div className={classnames('sidebar-left', { show: sidebarOpen })}>
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="d-flex flex-column h-100">
            <div className="email-app-menu flex-grow-1">
              <div className="form-group-compose text-center compose-btn">
                <Button block color="primary">{t('MAIL.COMPOSE')}</Button>
              </div>
              {
                isFetchingMailboxes ? (
                  <MailboxesSkeleton />
                ) : (
                  <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                    <ListGroup tag="div" className="list-group-messages">
                      {
                        mailboxes.map((mailbox) => (
                          <ListGroupItem
                            key={mailbox.name}
                            onClick={() => onMailboxSelected(mailbox.name)}
                            action
                            active={selectedMailbox === mailbox.name}
                          >
                            {mailIcons[mailbox.name.toLowerCase()]}
                            <span className="align-middle">
                              {i18n.exists(`MAIL.${mailbox.name.toUpperCase()}`) ? t(`MAIL.${mailbox.name.toUpperCase()}`) : capitalizeFirstLetter(mailbox.name.toUpperCase())}
                            </span>
                            {
                              mailbox.unread > 0 && (
                                <Badge className="float-end" color="light-primary" pill>
                                  {mailbox.unread}
                                </Badge>
                              )
                            }
                          </ListGroupItem>
                        ))
                      }
                    </ListGroup>
                  </PerfectScrollbar>
                )
              }
            </div>
            <div className="email-settings">
              <User className="email-settings-item" id="switchAccount" onClick={() => setShowAccountModal(true)} />
              <Settings className="email-settings-item" id="settings" />
              <UncontrolledTooltip target="switchAccount">
                {
                  mailAccount ? `${mailAccount.name}\n${mailAccount.email}` : t('MAIL.SWITCH_ACCOUNT')
                }
              </UncontrolledTooltip>
              <UncontrolledTooltip target="settings">{t('MAIL.SETTINGS')}</UncontrolledTooltip>
            </div>
          </div>
        </div>
      </div>
      <SwitchAccountModal
        isOpen={showAccountModal}
        toggle={() => setShowAccountModal(!showAccountModal)}
      />
    </div>
  );
}
