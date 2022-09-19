import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  ModalHeader, Modal, ModalBody, Form,
} from 'reactstrap';
import Wizard, { WizardStep } from '@components/Wizard/Wizard';
import {
  ArrowDown, Book, Check,
} from 'react-feather';
import ChooseEmailProvider from '@features/Settings/connections/mail/ChooseEmailProvider';
import { useForm } from 'react-hook-form';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import ConfigureInbound from '@features/Settings/connections/mail/ConfigureInbound';
import ConfigureOutbound from '@features/Settings/connections/mail/ConfigureOutbound';
import Stepper from '@utils/Stepper';
import Review from '@features/Settings/connections/mail/Review';
import i18n from '@config/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { mailActions } from '@redux/slices/mailSlice';

export interface LinkEmailModalProps {
  isOpen: boolean,
}

const defaultValues: Partial<LinkEmailFormData> = {
  provider: 'Other',
  protocol: 'imap',
  inboundSslMode: 'ssl/tls',
  outboundSslMode: 'ssl/tls',
};

export default function LinkEmailModal(props: LinkEmailModalProps) {
  const { isOpen } = props;
  const form = useForm<LinkEmailFormData>({ defaultValues });
  const [stepper] = useState<Stepper>(new Stepper());
  const dispatch = useDispatch();
  const modalStatus = useSelector((state: RootState) => state.mail.linkModalStatus);
  const steps: WizardStep[] = useMemo(() => [
    {
      id: 'details',
      title: i18n.t('MAIL.DETAILS'),
      subtitle: i18n.t('MAIL.DETAILS_SUBTITLE'),
      icon: <Book className="font-medium-3" />,
      content: <ChooseEmailProvider form={form} stepper={stepper} />,
    },
    {
      id: 'inbound',
      title: i18n.t('MAIL.CONFIGURE_INBOUND'),
      subtitle: i18n.t('MAIL.CONFIGURE_INBOUND_SUBTITLE'),
      icon: <ArrowDown className="font-medium-3" />,
      content: <ConfigureInbound form={form} stepper={stepper} />,
    },
    {
      id: 'outbound',
      title: i18n.t('MAIL.CONFIGURE_OUTBOUND'),
      subtitle: i18n.t('MAIL.CONFIGURE_OUTBOUND_SUBTITLE'),
      icon: <ArrowDown className="font-medium-3 rotate-180" />,
      content: <ConfigureOutbound form={form} stepper={stepper} />,
    },
    {
      id: 'review',
      title: i18n.t('MAIL.SUBMIT'),
      subtitle: i18n.t('MAIL.SUBMIT_SUBTITLE'),
      icon: <Check className="font-medium-3" />,
      content: <Review form={form} stepper={stepper} />,
    },
  ], [form, stepper]);

  useEffect(() => {
    // Watch state change that represents success linking
    // Reset the form before close this modal
    if (modalStatus === 'finished') {
      form.reset({});
      dispatch(mailActions.closeLinkModal());
    }
  }, [modalStatus, form]);

  const handleOnDismiss = useCallback(() => {
    if (modalStatus === 'linking') {
      // Disable dismissing whenever an email is linking
      return;
    }
    form.reset({});
    dispatch(mailActions.closeLinkModal());
  }, [modalStatus, form]);

  return (
    <Modal isOpen={isOpen} toggle={handleOnDismiss} className="modal-dialog-centered modal-lg">
      <ModalHeader className="bg-transparent" toggle={handleOnDismiss} />
      <ModalBody>
        <h1 className="text-center mb-1">{i18n.t('MAIL.LINK_EMAIL_TITLE')}</h1>
        <p className="text-center mb-2">{i18n.t('MAIL.LINK_EMAIL_SUBTITLE')}</p>
        <Form>
          <Wizard
            type="vertical"
            headerClassName="border-0"
            contentClassName="shadow-none"
            steps={steps}
            stepper={stepper}
            className="bg-transparent create-app-wizard shadow-none"
          />
        </Form>
      </ModalBody>
    </Modal>
  );
}
