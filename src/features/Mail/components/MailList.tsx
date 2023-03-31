import React, {
  ChangeEvent, useCallback, useState,
} from 'react';
import {
  Folder, Mail as MailIcon,
} from 'react-feather';
import {
  DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Spinner, UncontrolledDropdown,
} from 'reactstrap';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MailListItem from '@features/Mail/components/MailListItem';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { mailActions } from '@redux/slices/mailSlice';
import { mailIcons, Y_SCROLL_END_THRESHOLD } from '@utils/MailUtils';
import MailListSkeleton from '@features/Mail/components/MailListSkeleton';
import EmptyMailList from '@features/Mail/components/EmptyMailList';
import ErrorMailList from '@features/Mail/components/ErrorMailList';
import { useMailboxes, useMails } from '@hooks/mail';
import DeleteMailButton from '@features/Mail/components/DeleteMailButton';

export default function MailList() {
  const { mails, loadMailMessages } = useMails();
  const mailboxes = useMailboxes();
  const [selectedMails, setSelectedMails] = useState<MailMessage[]>([]);
  const selectedMailbox = useSelector((state: RootState) => state.mail.selectedMailboxId);
  const { t } = useTranslation();
  const isFetchingMails = useSelector((state: RootState) => state.mail.isFetchingMailboxes);
  const isLoadingMoreMessages = useSelector((state: RootState) => state.mail.isLoadingMoreMessages);
  const fetchingMailsFailed = useSelector((state: RootState) => state.mail.fetchingMailsFailed);
  const dispatch = useDispatch();

  // Select all messages
  const onSelectAll = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedMails(mails);
    } else {
      setSelectedMails([]);
    }
  }, [mails]);

  // Move a message to another mailbox
  const moveToMailbox = useCallback((e: React.MouseEvent, mailbox: string) => {
    e.preventDefault();
    setSelectedMails([]);
    dispatch(mailActions.changeMailbox({ mailbox, mails: selectedMails }));
  }, [selectedMails]);

  // Mark all selected messages as read
  const markAsRead = useCallback(() => {
  }, [selectedMails]);

  const onMailClicked = useCallback((mail: MailMessage) => {
    dispatch(mailActions.selectMail(mail));
  }, []);

  // Select/unselected a message
  const onMailSelected = useCallback((mail: MailMessage, selected: boolean) => {
    if (selected) {
      // Add to selected list
      setSelectedMails([...selectedMails, mail]);
    } else {
      // Remove to selected list
      setSelectedMails(selectedMails.filter((selectedMail) => selectedMail !== mail));
    }
  }, [selectedMails]);

  const onScroll = useCallback((container: HTMLElement) => {
    const { scrollTop, offsetHeight, scrollHeight } = container;
    if (scrollTop + offsetHeight >= scrollHeight - Y_SCROLL_END_THRESHOLD) {
      dispatch(mailActions.loadMore());
    }
  }, []);

  const renderMailList = useCallback(() => {
    // Render fetching UI
    if (isFetchingMails) {
      return <MailListSkeleton />;
    }

    // Render error UI
    if (fetchingMailsFailed) {
      return <ErrorMailList onReload={loadMailMessages} />;
    }

    // Render empty UI
    if (mails.length === 0) {
      return <EmptyMailList />;
    }

    // Render mail list UI
    return (
      <ul className="email-media-list">
        {
          mails.map((mail) => (
            <MailListItem
              key={mail.messageId}
              mail={mail}
              onMailClicked={onMailClicked}
              onMailSelected={onMailSelected}
              isSelected={selectedMails.includes(mail)}
            />
          ))
        }
        {
          isLoadingMoreMessages && (
            <li className="text-center pt-1 pb-1">
              <Spinner color="primary" size="sm" />
            </li>
          )
        }
      </ul>
    );
  }, [isFetchingMails, fetchingMailsFailed, mails, isLoadingMoreMessages, selectedMails]);

  return (
    <>
      <div className="app-action">
        <div className="action-left form-check">
          <Input
            type="checkbox"
            id="select-all"
            onChange={onSelectAll}
            checked={selectedMails.length > 0 && selectedMails.length === mails.length}
          />
          <Label className="form-check-label fw-bolder ps-25 mb-0" for="select-all">
            {t('COMMON.SELECT_ALL')}
          </Label>
        </div>
        {selectedMails.length ? (
          <div className="action-right">
            <ul className="list-inline m-0">
              <li className="list-inline-item me-1">
                <UncontrolledDropdown>
                  <DropdownToggle tag="span">
                    <Folder size={18} />
                  </DropdownToggle>
                  <DropdownMenu end>
                    {
                      mailboxes.map((mailbox) => (
                        mailbox.name !== selectedMailbox && (
                          <DropdownItem
                            tag="a"
                            onClick={(e) => moveToMailbox(e, mailbox.name)}
                            className="d-flex align-items-center"
                          >
                            {mailIcons[mailbox.name.toLowerCase()]}
                            <span>{t(`MAIL.${mailbox.name}`)}</span>
                          </DropdownItem>
                        )
                      ))
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
              <li className="list-inline-item me-1">
                <span className="action-icon" onClick={markAsRead}>
                  <MailIcon size={18} />
                </span>
              </li>
              <li className="list-inline-item">
                <DeleteMailButton
                  mails={selectedMails}
                  callback={() => { setSelectedMails([]); }}
                />
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      <PerfectScrollbar className="email-user-list" options={{ }} onScrollY={onScroll}>
        {renderMailList()}
      </PerfectScrollbar>
    </>
  );
}
