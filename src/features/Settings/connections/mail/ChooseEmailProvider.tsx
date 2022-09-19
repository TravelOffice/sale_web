import React, { useCallback, useState } from 'react';
import { Controller, FieldPath } from 'react-hook-form';
import Select from 'react-select';
import classnames from 'classnames';
import { mailProviders } from '@domain/entities/mail/MailAccount';
import {
  Button, FormFeedback, Input, Label,
} from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { LinkEmailStepProps } from '@features/Settings/connections/mail/LinkEmailStepProps';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import { useTranslation } from 'react-i18next';
import i18n from '@config/i18n';

const schema = yup.object().shape({
  name: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.NAME') })),
  mailAddress: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.MAIL_ADDRESS') }))
    .email(i18n.t('COMMON.INVALID_EMAIL', { field: i18n.t('MAIL.MAIL_ADDRESS') })),
});

export default function ChooseEmailProvider(props: LinkEmailStepProps) {
  const { form, stepper } = props;
  const [errors, setErrors] = useState<Partial<Record<FieldPath<LinkEmailFormData>, string>>>({});
  const { t } = useTranslation();
  const { control, getValues } = form;
  const onNext = useCallback(() => {
    const [name, mailAddress] = getValues(['name', 'mailAddress']);
    schema.validate({ name, mailAddress }, { abortEarly: false }).then(() => {
      setErrors({});
      stepper.next();
    }).catch((err: ValidationError) => {
      setErrors(err.inner.reduce((a, v) => ({ ...a, [v.path!]: v.message }), {}));
    });
  }, []);

  return (
    <>
      <div className="mb-1 d-none">
        <Label className="form-label" for="country">
          {t('MAIL.PROVIDER')}
          {' '}
          <span className="text-danger">*</span>
        </Label>
        <Controller
          name="provider"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Select
              isClearable={false}
              classNamePrefix="select"
              options={mailProviders.map((provider) => ({ label: provider, value: provider }))}
              className={classnames('react-select')}
              value={{ label: value, value }}
              onChange={(newValue) => onChange(newValue?.value)}
              {...rest}
            />
          )}
        />
      </div>
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
          name="mailAddress"
          control={control}
          render={({ field }) => (
            <Input id="mailAddress" type="email" placeholder={t('MAIL.MAIL_ADDRESS')} invalid={!!errors.mailAddress} {...field} />
          )}
        />
        {errors.mailAddress && <FormFeedback>{errors.mailAddress}</FormFeedback>}
      </div>
      <div className="d-flex justify-content-between mt-2">
        <Button color="secondary" outline disabled>
          <ArrowLeft size={14} className="rotate-rtl align-middle me-sm-50 me-0" />
          <div className="align-middle d-sm-inline-block d-none">{t('COMMON.PREVIOUS')}</div>
        </Button>
        <Button color="primary" onClick={onNext}>
          <div className="align-middle d-sm-inline-block d-none">{t('COMMON.NEXT')}</div>
          <ArrowRight size={14} className="rotate-rtl align-middle ms-sm-50 ms-0" />
        </Button>
      </div>
    </>
  );
}
