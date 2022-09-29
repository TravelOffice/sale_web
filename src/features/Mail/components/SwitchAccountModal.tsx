import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Input,
  ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import { useMailAccounts, useSelectedMailAccount } from '@hooks/mail';
import { getMailProviderLogo } from '@utils/MailUtils';
import { MailAccount } from '@domain/entities/mail/MailAccount';
import { useDispatch } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import { useTranslation } from 'react-i18next';

export interface SwitchAccountModalProps {
  toggle: () => void,
  isOpen: boolean,
}

export default function SwitchAccountModal(props: SwitchAccountModalProps) {
  const { toggle, isOpen } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mailAccounts = useMailAccounts();
  const selectedMailAccount = useSelectedMailAccount();

  const [mailAccount, setMailAccount] = useState<MailAccount>();

  useEffect(() => {
    setMailAccount(selectedMailAccount);
  }, [selectedMailAccount]);

  const switchAccount = useCallback(() => {
    if (mailAccount) {
      dispatch(mailActions.selectAccount(mailAccount));
      toggle();
    }
  }, [mailAccount]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered modal-lg">
      <ModalHeader className="bg-transparent" toggle={toggle} />
      <ModalBody className="pb-3 px-sm-3">
        <h1 className="text-center mb-1">{t('MAIL.SELECT_ACCOUNT')}</h1>
        <p className="text-center mb-2">{t('MAIL.SELECT_ACCOUNT_DESCRIPTION')}</p>
        <ListGroup
          flush
          defaultValue={selectedMailAccount?.email}
        >
          {
            mailAccounts.map((account) => (
              <ListGroupItem className="border-0 px-0">
                <label htmlFor={account.email} className="d-flex cursor-pointer">
                  <span className="me-1">
                    <img src={getMailProviderLogo(account.provider)} alt={account.email} height="42" width="42" />
                  </span>
                  <span className="d-flex align-items-center justify-content-between flex-grow-1">
                    <div className="me-1">
                      <h5 className="d-block fw-bolder">{account.name}</h5>
                      <span>{account.email}</span>
                    </div>
                    <span>
                      <Input
                        type="radio"
                        id={account.email}
                        name="mailAccount"
                        onClick={() => setMailAccount(account)}
                        defaultChecked={selectedMailAccount?.email === account?.email}
                      />
                    </span>
                  </span>
                </label>
              </ListGroupItem>
            ))
          }
        </ListGroup>
        <div className="d-flex mt-2 justify-content-center gap-1">
          <Button color="secondary" outline onClick={toggle}>{t('COMMON.CANCEL')}</Button>
          <Button color="primary" onClick={switchAccount}>{t('COMMON.SUBMIT')}</Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
