import React, { useCallback, useState } from 'react';
import {
  Controller, FieldPath,
} from 'react-hook-form';
import {
  Button, FormFeedback, Input, Label, Spinner,
} from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { LinkEmailStepProps } from '@features/Settings/connections/mail/LinkEmailStepProps';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { useTranslation } from 'react-i18next';
import { mailPresenter } from '@adapter/presenters';
import { InboundSslMode, MailProtocol } from '@domain/entities/mail/MailAccount';
// import { InboundSslMode, MailProtocol } from '@domain/entities/mail/MailAccount';

// const schema = yup.object().shape({
//   name:
//   yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.NAME') })),
//   email:
//   yup.string().required(i18n.t('COMMON.FIEL
//   D_IS_REQUIRED', { field: i18n.t('MAIL.MAIL_ADDRESS') }))
//     .email(i18n.t('COMMON.INVALID_EMAIL', { field: i18n.t('MAIL.MAIL_ADDRESS') })),
// });

// const validateValues = async (getValues: UseFormGetValues<LinkEmailFormData>) => {
//   const [name, email] = getValues(['name', 'email']);
//   return schema.validate({ name, email }, { abortEarly: false });
// };

export default function ChooseEmailProvider(props: LinkEmailStepProps) {
  const [isCheckingMailServer, setIsCheckingMailServer] = useState(false);
  const { form, stepper } = props;
  const [errors] = useState<Partial<Record<FieldPath<LinkEmailFormData>, string>>>({});
  const { t } = useTranslation();
  const { control, getValues, setValue } = form;

  const setValues = useCallback((values: Partial<LinkEmailFormData>) => {
    Object.entries(values).forEach(([key, value]) => {
      setValue(key as keyof LinkEmailFormData, value);
    });
  }, []);

  const onNext = useCallback(() => {
    // validateValues(getValues).then(() => {
    //   // setIsCheckingMailServer(true);
    //   setErrors({});
    //   const mailAddress = getValues('email');
    //
    // }).catch((err: ValidationError) => {
    //   setErrors(err.inner.reduce((a, v) => ({ ...a, [v.path!]: v.message }), {}));
    // });
    setIsCheckingMailServer(true);
    const mailAddress = getValues('email');
    mailPresenter.getMailServer(mailAddress).then((mailServer) => {
      setIsCheckingMailServer(false);
      setValues({
        provider: mailServer.name,
        protocol: mailServer.incoming.type as MailProtocol,
        inboundHost: mailServer.incoming.host,
        inboundPort: mailServer.incoming.port,
        inboundSslMode: mailServer.incoming.connection_security as InboundSslMode,
        inboundUser: mailAddress,
        outboundHost: mailServer.outgoing.host,
        outboundPort: mailServer.outgoing.port,
        outboundSslMode: mailServer.outgoing.connection_security as InboundSslMode,
        outboundUser: mailAddress,
        authMethod: mailServer.incoming.authentication_method,
        oauthUrl: mailServer.oauthUrl,
      });
      stepper.next();
    });
  }, []);

  return (
    <>
      <div className="mb-1">
        <Label className="form-label" for="country">
          {t('MAIL.NAME')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input id="name" type="text" placeholder={t('MAIL.NAME')} invalid={!!errors.name} {...field} />
          )}
        />
        {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
      </div>
      <div className="mb-1">
        <Label className="form-label" for="country">
          {t('MAIL.MAIL_ADDRESS')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input id="mailAddress" type="email" placeholder={t('MAIL.MAIL_ADDRESS')} invalid={!!errors.email} {...field} />
          )}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </div>
      <div className="d-flex justify-content-between mt-2">
        <Button color="secondary" outline disabled>
          <ArrowLeft size={14} className="rotate-rtl align-middle me-sm-50 me-0" />
          <div className="align-middle d-sm-inline-block d-none">{t('COMMON.PREVIOUS')}</div>
        </Button>
        <Button color="primary" onClick={onNext} disabled={isCheckingMailServer}>
          {
            isCheckingMailServer ? (
              <Spinner size="sm" />
            ) : (
              <>
                <div className="align-middle d-sm-inline-block d-none">{t('COMMON.CHECK')}</div>
                <ArrowRight size={14} className="rotate-rtl align-middle ms-sm-50 ms-0" />
              </>
            )
          }
        </Button>
      </div>
    </>
  );
}
