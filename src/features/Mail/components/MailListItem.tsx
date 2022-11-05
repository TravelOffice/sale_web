import React from 'react';
import { MailMessage } from '@domain/entities/mail/MailMessage';
import classnames from 'classnames';
import { Input, Label } from 'reactstrap';
import { Paperclip } from 'react-feather';
import { formatDateToMonthShort } from '@utils/DateUtils';
import { htmlToString } from '@utils/CommonUtils';
import { mailFlags } from '@utils/MailUtils';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

export interface MailListItemProps {
  mail: MailMessage,
  onMailClicked: (mail: MailMessage) => void,
  onMailSelected: (mail: MailMessage, selected: boolean) => void,
  isSelected: boolean,
}

export default function MailListItem(props: MailListItemProps) {
  const {
    mail,
    onMailClicked,
    onMailSelected,
    isSelected,
  } = props;

  const selectedMailAccount = useSelector((state: RootState) => state.mail.selectedMailAccount);

  const getTitle = () => {
    const from = mail.from[0];
    const to = mail.to.addresses[0];
    if (from.address === selectedMailAccount?.email) {
      return to.personal || to.address;
    }
    return from.personal || from.address;
  };

  return (
    <li onClick={() => onMailClicked(mail)} className={classnames('d-flex user-mail', { 'mail-read': mail.flags !== mailFlags.recent })}>
      <div className="mail-left pe-50">
        <div className="user-action">
          <div className="form-check">
            <Input
              type="checkbox"
              id={`${mail.from[0].personal || mail.from[0].address}-${mail.messageId}`}
              onChange={(e) => {
                onMailSelected(mail, e.target.checked);
                e.stopPropagation();
              }}
              checked={isSelected}
            />
            <Label onClick={(e) => e.stopPropagation()} for={`${mail.from[0].personal || mail.from[0].address}-${mail.messageId}`} />
          </div>
        </div>
      </div>
      <div className="mail-body">
        <div className="mail-details">
          <div className="mail-items">
            <h5 className="mb-25">
              {getTitle()}
              {' '}
              -
              {' '}
              <span className="text-truncate">{mail.subject}</span>
            </h5>
          </div>
          <div className="mail-meta-item">
            {mail.attachments && mail.attachments.length ? <Paperclip size={14} /> : null}
            {/* {renderLabels(mail.labels)} */}
            {' '}
            <span className="mail-date">{formatDateToMonthShort(new Date(mail.sentDate))}</span>
          </div>
        </div>
        <div className="mail-message">
          <p className="text-truncate mb-0">{htmlToString(mail.briefContent)}</p>
        </div>
      </div>
    </li>
  );
}
