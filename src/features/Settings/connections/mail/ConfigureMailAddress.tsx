import React, { useCallback } from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { mailPresenter } from '@adapter/presenters';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { ConfigureMailAccountStepProps } from '@features/Settings/connections/mail/ConfigureMailAccountStepProps';
import { Controller, useWatch } from 'react-hook-form';
import { MailServer } from '@domain/entities/mail/MailServer';
import * as yup from 'yup';
import i18n from '@config/i18n';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { useMutation } from '@tanstack/react-query';
import { useYupValidation } from '@hooks/common';
import Images from '@themes/Images';
import { showLinkMailAccountFailed } from '@utils/MailUtils';

export interface MailAddressInputProps extends ConfigureMailAccountStepProps<MailServer> {
}

const schema = yup.object().shape({
  name: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.NAME') })),
  email: yup.string()
    .required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.MAIL_ADDRESS') }))
    .email(i18n.t('COMMON.INVALID_EMAIL', { field: i18n.t('MAIL.MAIL_ADDRESS') })),
});

export default function ConfigureMailAddress(props: MailAddressInputProps) {
  const { onNext, form } = props;
  const { control, setValue } = form;
  const { t } = useTranslation();
  const { errors, validate } = useYupValidation<LinkEmailFormData>();
  const [mailAddress, name] = useWatch({ control, name: ['email', 'name'] });

  const getMailServerMutation = useMutation({
    mutationFn: () => mailPresenter.getMailServer(mailAddress),
    onError: (error: Error) => {
      showLinkMailAccountFailed(error);
    },
    onSuccess: (mailServer: MailServer) => {
      // Update mail server information to form
      setValue('protocol', mailServer.incoming.type);
      setValue('inboundHost', mailServer.incoming.host);
      setValue('inboundPort', mailServer.incoming.port);
      setValue('inboundSslMode', mailServer.incoming.connection_security);
      setValue('inboundUser', mailAddress);
      setValue('outboundHost', mailServer.outgoing.host);
      setValue('outboundPort', mailServer.outgoing.port);
      setValue('outboundSslMode', mailServer.outgoing.connection_security);
      setValue('outboundUser', mailAddress);

      // Call method to next action
      onNext(mailServer);
    },
  });

  // Handle when the user submit her email address
  const handleOnNext = useCallback(async () => {
    const isValid = validate(schema, { name, email: mailAddress });
    if (!isValid) return;
    getMailServerMutation.mutate();
  }, [mailAddress, name]);

  return (
    <div className="d-flex flex-column">
      <img src={Images.illustration.email} alt="" width="50%" className="mx-auto" />
      <div className="mb-1">
        <Label className="form-label">
          {t('MAIL.NAME')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder={t('MAIL.NAME')} invalid={!!errors.name} {...field} />
          )}
        />
        {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
      </div>
      <div className="mb-1">
        <Label className="form-label">
          {t('MAIL.MAIL_ADDRESS')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder={t('MAIL.MAIL_ADDRESS')} invalid={!!errors.email} {...field} />
          )}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </div>
      <LoadingButton className="mt-2" color="primary" block onClick={handleOnNext} disabled={getMailServerMutation.isLoading} loading={getMailServerMutation.isLoading}>
        {t('COMMON.NEXT_STEP')}
      </LoadingButton>
    </div>
  );
}
