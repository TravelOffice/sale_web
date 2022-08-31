import React, {
  ReactNode, useCallback, useMemo,
} from 'react';
import classnames from 'classnames';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, UncontrolledDropdown,
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Edit2, Info, Mail, Send, Star, Trash,
} from 'react-feather';
import {
  useMailAccounts, useMailboxes, useSelectedMailAccount, useSelectedMailbox,
} from '@hooks/mail';
import { capitalizeFirstLetter } from '@utils/CommonUtils';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import Skeleton from 'react-loading-skeleton';
import { RootState } from '@redux/store';
import { getMailProviderLogo } from '@utils/MailUtils';

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

function AccountSkeleton() {
  return (
    <div className="form-group-account text-center d-flex flex-row cursor-pointer">
      <div className="avatar-wrapper">
        <Skeleton circle width={42} height={42} />
      </div>
      <div className="d-flex flex-column align-items-start justify-content-center text-truncate w-100">
        <h5 className="mb-25 font-medium-1 w-100"><Skeleton /></h5>
        <span className="text-truncate font-small-3 w-100"><Skeleton /></span>
      </div>
    </div>
  );
}

function MailboxesSkeleton() {
  return (
    <ListGroup className="list-group-messages">
      {
        [...new Array(5)].map(() => (
          <ListGroupItem><Skeleton /></ListGroupItem>
        ))
      }
    </ListGroup>
  );
}

export default function Sidebar(props: SidebarProps) {
  const {
    sidebarOpen,
  } = props;
  const dispatch = useDispatch();
  const selectedMailAccount = useSelectedMailAccount();
  const selectedMailbox = useSelectedMailbox();
  const mailAccounts = useMailAccounts();
  const mailboxes = useMailboxes();
  const { isFetchingMailAccounts, isFetchingMailboxes } = useSelector((state: RootState) => ({
    isFetchingMailAccounts: state.mail.isFetchingMailAccounts,
    isFetchingMailboxes: state.mail.isFetchingMailboxes,
  }));
  const otherMailAccounts = useMemo(
    () => mailAccounts.filter((account) => account.email !== selectedMailAccount?.email),
    [mailAccounts, selectedMailAccount],
  );
  const onMailboxSelected = useCallback((mailbox: string) => {
    dispatch(mailActions.selectMailbox(mailbox));
  }, []);
  const onAccountSelected = useCallback((mailAccount: MailAccount) => {
    dispatch(mailActions.selectAccount(mailAccount));
  }, []);
  return (
    <div className={classnames('sidebar-left', { show: sidebarOpen })}>
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            {
              isFetchingMailAccounts ? (
                <AccountSkeleton />
              ) : (
                <div className="form-group-account text-center d-flex flex-row cursor-pointer">
                  <UncontrolledDropdown tag="div" className="dropdown-user nav-item">
                    <DropdownToggle href="/" tag="a" className="nav-link avatar-wrapper" onClick={(e) => e.preventDefault()}>
                      {
                        selectedMailAccount && (
                          <img src={getMailProviderLogo(selectedMailAccount.provider)} alt="" width={42} height={42} />
                        )
                      }
                    </DropdownToggle>
                    {
                      otherMailAccounts.length > 0 && (
                        <DropdownMenu>
                          <h5 className="ps-2 pt-1 pb-1">Switch account</h5>
                          {
                            otherMailAccounts.map((account) => (
                              <DropdownItem tag="div" to="/pages/profile" onClick={() => onAccountSelected(account)}>
                                <div className="d-flex flex-row">
                                  <div className="d-flex align-items-center">
                                    <img src={getMailProviderLogo(account.provider)} alt="" width={32} height={32} />
                                  </div>
                                  <div className="d-flex flex-column ps-1">
                                    <span className="align-middle fw-bold">
                                      {account.name}
                                    </span>
                                    <span className="align-middle text-primary font-small-3">{account.email}</span>
                                  </div>
                                </div>
                              </DropdownItem>
                            ))
                          }
                        </DropdownMenu>
                      )
                    }
                  </UncontrolledDropdown>
                  <div className="d-flex flex-column align-items-start justify-content-center text-truncate">
                    <h5 className="mb-25 font-medium-1">{selectedMailAccount?.name}</h5>
                    <span className="text-truncate font-small-3">{selectedMailAccount?.email}</span>
                  </div>
                </div>
              )
            }
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
                          <span className="align-middle">{capitalizeFirstLetter(mailbox.name.toLowerCase())}</span>
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
        </div>
      </div>
    </div>
  );
}
