import React from 'react';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { capitalizeFirstLetter } from '@utils/CommonUtils';
import { getMailProviderLogo } from '@utils/MailUtils';

export interface MailAccountItemProps extends React.HTMLAttributes<HTMLDivElement> {
  mailAccount: MailAccount,
}

export default function MailAccountItem(props: MailAccountItemProps) {
  const { mailAccount, className } = props;

  return (
    <div className={className}>
      <div className="flex-shrink-0">
        <img
          className="me-1"
          src={getMailProviderLogo(mailAccount.provider)}
          alt=""
          height="38"
          width="38"
        />
      </div>
      <div className="d-flex align-item-center justify-content-between flex-grow-1">
        <div className="me-1">
          <p className="fw-bolder mb-0">{capitalizeFirstLetter(mailAccount.name)}</p>
          <span>{mailAccount.email}</span>
        </div>
        <div className="mt-50 mt-sm-0" />
      </div>
    </div>
  );
}
