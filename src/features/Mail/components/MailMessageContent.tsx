import React, {
  useCallback, useEffect, useState,
} from 'react';
import { MailMessage, MailMessageAddress } from '@domain/entities/mail/MailMessage';
import {
  Card, CardBody, CardFooter, CardHeader, DropdownItem, DropdownMenu, DropdownToggle,
  Table, UncontrolledDropdown,
} from 'reactstrap';
import { downloadAttachment, getDisplayMailAddress, getFileThumbnail } from '@utils/MailUtils';
import moment from 'moment';
import {
  CornerUpLeft, CornerUpRight, MoreVertical, Paperclip, Trash2,
} from 'react-feather';
import classNames from 'classnames';
import LazyImage from '@components/Image/LazyImage';
import { getFileSizeText } from '@utils/FileUtils';
import { MailAttachment } from '@domain/entities/mail/MailAttachment';
import { removeElement } from '@utils/ArrayUtils';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MailAddress } from '@domain/entities/mail/MailAddress';
import { mailActions } from '@redux/slices/mailSlice';
import { useDispatch } from 'react-redux';
import MailMessageContentFrame from '@features/Mail/components/MailMessageContentFrame';

export interface MailMessageContentProps {
  mail: MailMessage,
}

function renderMailAddresses(mailAddress: MailMessageAddress) {
  const displayMailAddresses = mailAddress.addresses.map((address) => getDisplayMailAddress(address)).join(', ');
  const others = mailAddress.count - mailAddress.addresses.length;
  if (others > 0) {
    return `${displayMailAddresses} +${others}`;
  }
  return displayMailAddresses;
}

export default function MailMessageContent(props: MailMessageContentProps) {
  const { mail } = props;
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');
  const [downloadingFiles, setDownloadingFiles] = useState<MailAttachment[]>([]);
  const [isFetchingHtmlContent, setIsFetchingHtmlContent] = useState(false);
  const { attachments } = mail;
  const date = moment(mail.receivedDate || mail.updatedAt);
  const [addresses, setAddresses] = useState<Record<'to' | 'cc' | 'bcc', MailAddress[]>>({
    to: [],
    cc: [],
    bcc: [],
  });

  useEffect(() => {
    if (mail) {
      const cc: MailAddress[] = mail.cc?.addresses || [];
      const bcc: MailAddress[] = mail.bcc?.addresses || [];
      setAddresses({ to: mail.to.addresses, cc, bcc });
      fetch(mail.metaData).then((res) => res.json()).then((data) => {
        setAddresses(data);
      });
    }
  }, [mail]);

  const fetchHtmlContent = useCallback(() => {
    setIsFetchingHtmlContent(true);
    fetch(mail.htmlContent)
      .then((res) => res.text())
      .then((content) => setHtmlContent(content))
      .then(() => setHasError(false))
      .catch(() => setHasError(true))
      .finally(() => setIsFetchingHtmlContent(false));
  }, []);

  useEffect(() => {
    fetchHtmlContent();
  }, []);

  const downloadFile = useCallback((attachment: MailAttachment) => {
    // Do not download a file which has already in downloading state
    if (downloadingFiles.includes(attachment)) return;
    setDownloadingFiles(downloadingFiles.concat(attachment));
    downloadAttachment(attachment).finally(() => {
      setDownloadingFiles(removeElement(downloadingFiles, (
        downloadingAttachment,
      ) => downloadingAttachment !== attachment));
    });
  }, []);

  const dispatch = useDispatch();
  const openCompose = ((e: any, type: 'draft' | 'reply' | 'reply_all' | 'forward' | 'new') => {
    e.preventDefault();
    if (mail) {
      dispatch(mailActions.openComposeModal({ mail, type }));
    }
  });
  const onReplyCompose = useCallback((e: any) => openCompose(e, 'reply'), [mail]);
  const onReplyAllCompose = useCallback((e: any) => openCompose(e, 'reply_all'), [mail]);
  const onForwardCompose = useCallback((e: any) => openCompose(e, 'forward'), [mail]);

  return (
    <Card>
      <CardHeader className="email-detail-head">
        <div className="user-details d-flex justify-content-between align-items-center flex-wrap">
          <div className="mail-items">
            <h5 className="mb-0">{getDisplayMailAddress(mail.from[0])}</h5>
            <UncontrolledDropdown className="email-info-dropup">
              <DropdownToggle className="font-small-3 text-muted cursor-pointer" tag="span" caret>
                <span className="me-25">
                  {t('MAIL.TO')}
                  :
                  {' '}
                  {renderMailAddresses(mail.to)}
                </span>
              </DropdownToggle>
              <DropdownMenu>
                <Table className="font-small-3" size="sm" borderless>
                  <tbody>
                    <tr>
                      <td className="text-end text-muted align-top">
                        {t('MAIL.FROM')}
                        :
                      </td>
                      <td>{getDisplayMailAddress(mail.from[0])}</td>
                    </tr>
                    <tr>
                      <td className="text-end text-muted align-top">
                        {t('MAIL.TO')}
                        :
                      </td>
                      <td>
                        <PerfectScrollbar className="to">
                          {addresses.to.map((address) => getDisplayMailAddress(address)).join('\n')}
                        </PerfectScrollbar>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-end text-muted align-top">
                        {t('MAIL.DATE')}
                        :
                      </td>
                      <td>{date.format('hh:mm DD MMMM YYYY')}</td>
                    </tr>
                  </tbody>
                </Table>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="mail-meta-item d-flex align-items-center">
          <small className="mail-date-time text-muted">{date.format('MMM DD, YYYY')}</small>
          <UncontrolledDropdown className="ms-50">
            <DropdownToggle className="cursor-pointer" tag="span">
              <MoreVertical size={14} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className="d-flex align-items-center w-100" onClick={onReplyCompose}>
                <CornerUpLeft className="me-50" size={14} />
                {t('MAIL.REPLY')}
              </DropdownItem>
              <DropdownItem className="d-flex align-items-center w-100" onClick={onReplyAllCompose}>
                <CornerUpLeft className="me-50" size={14} onClick={onReplyAllCompose} />
                {t('MAIL.REPLY_ALL')}
              </DropdownItem>
              <DropdownItem className="d-flex align-items-center w-100" onClick={onForwardCompose}>
                <CornerUpRight className="me-50" size={14} />
                {t('MAIL.FORWARD')}
              </DropdownItem>
              <DropdownItem className="d-flex align-items-center w-100">
                <Trash2 className="me-50" size={14} />
                {t('COMMON.DELETE')}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </CardHeader>
      <CardBody className="mail-message-wrapper pt-2">
        <MailMessageContentFrame
          isFetching={isFetchingHtmlContent}
          hasError={hasError}
          htmlContent={htmlContent}
          onReload={fetchHtmlContent}
        />
      </CardBody>
      {attachments && attachments.length > 0 && (
        <CardFooter>
          <div className="mail-attachments">
            <div className="d-flex align-items-center mb-1">
              <Paperclip size={16} />
              <h5 className="fw-bolder text-body mb-0 ms-50">
                {attachments.length}
                {' '}
                {attachments.length > 1 ? t('MAIL.ATTACHMENTS') : t('MAIL.ATTACHMENT')}
              </h5>
            </div>
            <div className="d-flex flex-column">
              {
                attachments.map((attachment, index) => (
                  <div
                    key={attachment.name}
                    className={classNames('text-primary', { 'mb-50': index + 1 !== attachments.length })}
                  >
                    <a
                      href={attachment.path}
                      target="_blank"
                      download={attachment.name}
                      rel="noreferrer"
                    >
                      <LazyImage lazySrc={getFileThumbnail(attachment.name)} alt={attachment.name} width="16" className="me-50" />
                      <span className="fw-bolder align-text-top">{attachment.name}</span>
                      {
                        attachment.size ? <span className="font-small-2 ms-25">{`(${getFileSizeText(attachment.size)})`}</span> : null
                      }
                    </a>
                    {' '}
                    <span className="font-small-2 ms-25 cursor-pointer" onClick={() => downloadFile(attachment)}>
                      {
                        downloadingFiles.includes(attachment) ? t('COMMON.DOWNLOADING') : t('COMMON.DOWNLOAD')
                      }
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
