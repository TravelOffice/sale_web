import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  Edit2, Folder, Info, Menu, Search, Trash, Mail as MailIcon,
} from 'react-feather';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupText,
  Label, Spinner,
  UncontrolledDropdown,
} from 'reactstrap';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MailListItem from '@features/Mail/components/MailListItem';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import Skeleton from 'react-loading-skeleton';
import { mailActions } from '@redux/slices/mailSlice';
import MailDetail from '@features/Mail/components/MailDetail';
import { numberArrayOf } from '@utils/ArrayUtils';
import { Y_SCROLL_END_THRESHOLD } from '@utils/MailUtils';
import LazyImage from '@components/Image/LazyImage';

export interface MailListProps {
  onMenuClick: () => void,
  mails: MailMessage[],
  onRefresh: () => void,
}

function MailListSkeleton() {
  return (
    <ul className="email-media-list">
      {
        numberArrayOf(5).map((i) => (
          <li key={i} className="user-mail">
            <Skeleton count={2} />
          </li>
        ))
      }
    </ul>
  );
}

export default function MailList(props: MailListProps) {
  const {
    onMenuClick, mails, onRefresh,
  } = props;
  const [query, setQuery] = useState('');
  const [selectedMails, setSelectedMails] = useState<MailMessage[]>([]);
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
    console.log('move to', mailbox);
    setSelectedMails([]);
  }, []);

  // Mark all selected messages as read
  const markAsRead = useCallback(() => {
  }, [selectedMails]);

  // Delete selected messages
  const deleteMails = useCallback(() => {

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
      return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <LazyImage className="h-50" lazySrc={import('@assets/images/illustration/error.svg')} />
          <div className="misc-inner pt-2">
            <div className="w-100 text-center">
              <p className="mb-2 font-medium-3">{t('COMMON.SOMETHING_WENT_WRONG')}</p>
              <Button color="primary" className="btn-sm-block mb-2" onClick={onRefresh}>
                {t('COMMON.TRY_AGAIN')}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Render empty UI
    if (mails.length === 0) {
      return (
        <div className="no-results d-block">
          <h5>{t('MAIL.NO_MAILS_FOUND')}</h5>
        </div>
      );
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
  }, [isFetchingMails, fetchingMailsFailed, mails, isLoadingMoreMessages]);

  return (
    <>
      <div className="email-app-list">
        <div className="app-fixed-search d-flex align-items-center">
          <div className="sidebar-toggle d-block d-lg-none ms-1" onClick={onMenuClick}>
            <Menu size="21" />
          </div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="email-search"
                placeholder={t('MAIL.SEARCH_EMAIL')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
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
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => moveToMailbox(e, 'draft')}
                        className="d-flex align-items-center"
                      >
                        <Edit2 className="me-50" size={18} />
                        <span>{t('MAIL.DRAFT')}</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => moveToMailbox(e, 'spam')}
                        className="d-flex align-items-center"
                      >
                        <Info className="me-50" size={18} />
                        <span>{t('MAIL.SPAM')}</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => moveToMailbox(e, 'trash')}
                        className="d-flex align-items-center"
                      >
                        <Trash className="me-50" size={18} />
                        <span>{t('COMMON.DELETE')}</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                <li className="list-inline-item me-1">
                  <span className="action-icon" onClick={markAsRead}>
                    <MailIcon size={18} />
                  </span>
                </li>
                <li className="list-inline-item">
                  <span className="action-icon" onClick={deleteMails}>
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <PerfectScrollbar className="email-user-list" options={{ }} onScrollY={onScroll}>
          {renderMailList()}
        </PerfectScrollbar>
      </div>
      <MailDetail />
    </>
  );
}
