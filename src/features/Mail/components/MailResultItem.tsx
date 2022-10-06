import React from 'react';
import classnames from 'classnames';
import { Input, Label } from 'reactstrap';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';
import { formatDateToMonthShort } from '@utils/DateUtils';

export interface MailResultItemProps {
  result: MailSearchResult,
  onMailClicked: (mail: MailSearchResult) => void,
  onMailSelected: (mail: MailSearchResult, selected: boolean) => void,
  isSelected: boolean,
}

export default function MailResultItem(props: MailResultItemProps) {
  const {
    result,
    onMailClicked,
    onMailSelected,
    isSelected,
  } = props;

  return (
    <li className={classnames('d-flex user-mail')}>
      <div className="mail-left pe-50">
        <div className="user-action">
          <div className="form-check">
            <Input
              type="checkbox"
              onChange={(e) => {
                e.stopPropagation();
                onMailSelected(result, e.target.checked);
              }}
              checked={isSelected}
            />
            <Label onClick={(e) => e.stopPropagation()} for={`${result.from[0].personal || result.from[0].address}-${result.messageId}`} />
          </div>
        </div>
      </div>
      <div className="mail-body" onClick={() => onMailClicked(result)}>
        <div className="mail-details">
          <div className="mail-items">
            <h5 className="mb-25">
              {result.from[0].personal || result.from[0].address}
            </h5>
          </div>
          <div className="mail-meta-item">
            <span className="mail-date">{formatDateToMonthShort(new Date(result.date))}</span>
          </div>
        </div>
        <div className="">
          {/* eslint-disable-next-line no-underscore-dangle,react/no-danger */}
          <p className="text-truncate mb-0" dangerouslySetInnerHTML={{ __html: result._formatted.content }} />
        </div>
      </div>
    </li>
  );
}
