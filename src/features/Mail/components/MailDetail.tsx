import React, { useCallback, useEffect, useState } from 'react';
import {
  useMailThread, useSelectedMail, useSelectedMailAccount, useSelectedMailbox,
} from '@hooks/mail';
import classNames from 'classnames';
import {
  Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown,
} from 'reactstrap';
import {
  ChevronLeft, Edit2, Folder, Info, Trash,
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import MailMessageContent from '@features/Mail/components/MailMessageContent';
import { useDispatch } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import MailContentSkeleton from '@features/Mail/components/MailContentSkeleton';
import { Trans, useTranslation } from 'react-i18next';

interface RenderContentOptions {
  mail: MailMessage,
  mailThread: MailMessage[],
  showMailThread: boolean,
  isFetching: boolean,
}

function renderContent(options: RenderContentOptions) {
  const {
    mailThread, showMailThread, mail, isFetching,
  } = options;
  if (!showMailThread) return <MailMessageContent mail={mail} />;
  if (isFetching) return <MailContentSkeleton />;
  return mailThread.map((mailMessage) => (
    <MailMessageContent mail={mailMessage} key={mailMessage.messageId} />
  ));
}

export default function MailDetail() {
  const [showMailThread, setShowMailThread] = useState(false);
  const mail = useSelectedMail();
  const mailAccount = useSelectedMailAccount();
  const mailboxId = useSelectedMailbox();
  const { t } = useTranslation();
  const {
    mailThread,
    isFetchingMailThread,
  } = useMailThread(mailAccount?.email, mailboxId, mail?.messageId!);
  const dispatch = useDispatch();
  useEffect(() => {
    setShowMailThread(false);
  }, [mail]);
  const handleGoBack = useCallback(() => {
    dispatch(mailActions.unselectMail());
  }, []);
  const handleFolderClick = useCallback((
    e: React.MouseEvent<HTMLElement>,
    _mailbox: string,
    _mailId: MailMessage,
  ) => {
    e.preventDefault();
  }, []);
  const deleteMessage = useCallback(() => {
  }, []);
  const viewMailThread = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowMailThread(!showMailThread);
  }, [mail, showMailThread]);

  const onReplyCompose = useCallback((e: any) => {
    e.preventDefault();
    if (mail) {
      dispatch(mailActions.openComposeModal({
        message: mail,
        type: 'reply',
      }));
    }
  }, [mail]);

  const onReplyAllCompose = useCallback((e: any) => {
    e.preventDefault();
    if (mail) {
      dispatch(mailActions.openComposeModal({
        message: mail,
        type: 'reply_all',
      }));
    }
  }, [mail]);

  const onForwardCompose = useCallback((e: any) => {
    e.preventDefault();
    if (mail) {
      dispatch(mailActions.openComposeModal({
        message: mail,
        type: 'forward',
      }));
    }
  }, [mail]);

  return (
    <div className={classNames('email-app-details', { show: mail })}>
      {mail && (
        <>
          <div className="email-detail-header">
            <div className="email-header-left d-flex align-items-center">
              <span className="go-back me-1" onClick={handleGoBack}>
                <ChevronLeft size={20} />
              </span>
              <h4 className="email-subject mb-0">{mail.subject}</h4>
            </div>
            <div className="email-header-right ms-2 ps-1">
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
                        onClick={(e) => handleFolderClick(e, 'draft', mail)}
                        className="d-flex align-items-center"
                      >
                        <Edit2 className="me-50" size={18} />
                        <span>{t('MAIL.DRAFT')}</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderClick(e, 'spam', mail)}
                        className="d-flex align-items-center"
                      >
                        <Info className="me-50" size={18} />
                        <span>{t('MAIL.SPAM')}</span>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="/"
                        onClick={(e) => handleFolderClick(e, 'trash', mail)}
                        className="d-flex align-items-center"
                      >
                        <Trash className="me-50" size={18} />
                        <span>{t('MAIL.DELETE')}</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
                <li className="list-inline-item me-1">
                  <span
                    className="action-icon"
                    onClick={deleteMessage}
                  >
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <PerfectScrollbar className="email-scroll-area" options={{ wheelPropagation: false }}>
            <Row className="mb-1 mt-3">
              {
                mail.inReplyTo && (
                  <Col sm="12">
                    <a href="/" className="fw-bold text-primary" onClick={viewMailThread}>
                      {!showMailThread ? t('MAIL.VIEW_MAIL_THREAD') : t('MAIL.VIEW_MESSAGE_ONLY')}
                    </a>
                  </Col>
                )
              }
            </Row>
            <Row className="mt-1">
              <Col sm="12">
                {
                  renderContent({
                    mail,
                    mailThread,
                    isFetching: isFetchingMailThread,
                    showMailThread,
                  })
                }
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <h5 className="mb-0">
                      <Trans i18nKey="MAIL.CLICK_HERE_TO_REPLY_OR_FORWARD">
                        Click here to
                        {' '}
                        <a className="text-primary" href="/" onClick={onReplyCompose}>
                          Reply
                        </a>
                        {', '}
                        <a className="text-primary" href="/" onClick={onReplyAllCompose}>
                          Reply All
                        </a>
                        {' or '}
                        <a className="text-primary" href="/" onClick={onForwardCompose}>
                          Forward
                        </a>
                      </Trans>
                    </h5>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </PerfectScrollbar>
        </>
      )}
    </div>
  );
}
