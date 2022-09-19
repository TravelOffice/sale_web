import React, { useCallback, useState } from 'react';
import {
  Button,
  Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import MailAccountItem from '@features/Settings/connections/mail/MailAccountItem';
import classNames from 'classnames';
import LinkEmailModal from '@features/Settings/connections/mail/LinkEmailModal';

const mailAccounts: MailAccount[] = [];

export default function MailConnection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const onLinkEmail = useCallback(() => setModalOpen(true), []);
  const onDismiss = useCallback(() => setModalOpen(false), []);
  return (
    <>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{t('MAIL.CONNECTED_MAILS')}</CardTitle>
        </CardHeader>
        <CardBody className="pt-2">
          {
            mailAccounts.length === 0 && (
              <div>
                <span>{t('MAIL.NO_EMAIL_LINKED')}</span>
                <br />
                <Button className="mt-1" color="primary" onClick={onLinkEmail}>{t('COMMON.GET_STARTED')}</Button>
              </div>
            )
          }
          {
            mailAccounts.length > 0 && (
              <>
                {
                  mailAccounts.map((account, index) => (
                    <MailAccountItem
                      mailAccount={account}
                      key={account.email}
                      className={classNames('d-flex', { 'mt-2': index > 0 }, { 'pb-2 border-bottom': true })}
                    />
                  ))
                }
                <Button className="mt-1" color="primary" onClick={onLinkEmail}>
                  {t('MAIL.ADD_MORE_ACCOUNT')}
                </Button>
              </>
            )
          }
        </CardBody>
      </Card>
      <LinkEmailModal isOpen={modalOpen} onDismiss={onDismiss} />
    </>
  );
}
