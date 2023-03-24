import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Form,
  Modal, ModalBody, ModalHeader, ModalProps,
} from 'reactstrap';
import i18n from '@config/i18n';
import { mailActions } from '@redux/slices/mailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import AutoConfigureEmail from '@features/Settings/connections/mail/AutoConfigureEmail';
import ManualConfigureEmail from '@features/Settings/connections/mail/ManualConfigureEmail';
import ConfigureMailAddress from '@features/Settings/connections/mail/ConfigureMailAddress';
import { MailServer } from '@domain/entities/mail/MailServer';
import { useForm, useWatch } from 'react-hook-form';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';

export interface ConnectMailModalProps extends ModalProps {}

type Step = 'config_mail_address' | 'auto_config' | 'manual_config';

const defaultValues: Partial<LinkEmailFormData> = {
  provider: 'Other',
  protocol: 'imap',
  inboundSslMode: 'ssl/tls',
  outboundSslMode: 'ssl/tls',
};

export default function ConfigureMailAccountModal(props: ConnectMailModalProps) {
  const { isOpen } = props;
  const [mailServer, setMailServer] = useState<MailServer>();
  const [step, setStep] = useState<Step>('config_mail_address');
  const form = useForm<LinkEmailFormData & { mailServer?: MailServer }>({ defaultValues });
  const { control, reset } = form;
  const [mailAddress] = useWatch({ control, name: ['email'] });
  const dispatch = useDispatch();
  const modalStatus = useSelector((state: RootState) => state.mail.linkModalStatus);

  useEffect(() => {
    if (!isOpen) {
      // Always clear data after closing the modal
      setMailServer(undefined);
      setStep('config_mail_address');
      reset(defaultValues);
    }
  }, [isOpen]);

  const handleOnDismiss = useCallback(() => {
    if (modalStatus === 'linking') {
      // Disable dismissing whenever an email is linking
      return;
    }
    dispatch(mailActions.closeLinkModal());
  }, [modalStatus]);

  // Handle when mail server information fetched
  const handleOnMailAddressSubmitted = useCallback((server?: MailServer) => {
    setMailServer(server);
    setStep(server ? 'auto_config' : 'manual_config');
  }, []);

  // Handle when the user add a new mail account successfully
  const handleOnMailAccountAdded = useCallback(() => {
    // Close modal after linking successfully
    dispatch(mailActions.closeLinkModal());
    dispatch(mailActions.refreshMailAccountList());
  }, []);

  const bodyContent = useMemo(() => {
    if (step === 'config_mail_address') {
      return <ConfigureMailAddress form={form} onNext={handleOnMailAddressSubmitted} />;
    }

    if (step === 'auto_config' && mailServer) {
      return (
        <AutoConfigureEmail
          form={form}
          onNext={handleOnMailAccountAdded}
          mailServer={mailServer}
          onManualConfig={() => setStep('manual_config')}
        />
      );
    }

    // Fallback to manual configuration
    return <ManualConfigureEmail form={form} onNext={handleOnMailAccountAdded} />;
  }, [step, mailAddress]);

  return (
    <Modal {...props} className="modal-dialog-centered modal-lg">
      <ModalHeader className="bg-transparent" toggle={handleOnDismiss} />
      <ModalBody>
        <h1 className="text-center mb-1">{i18n.t('MAIL.LINK_EMAIL_TITLE')}</h1>
        <p className="text-center mb-2">{i18n.t('MAIL.LINK_EMAIL_SUBTITLE')}</p>
        <Form>
          {bodyContent}
        </Form>
      </ModalBody>
    </Modal>
  );
}
