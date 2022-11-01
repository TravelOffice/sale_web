import React, { useCallback, useState } from 'react';
import { LinkEmailStepProps } from '@features/Settings/connections/mail/LinkEmailStepProps';
import { Controller, FieldPath, useWatch } from 'react-hook-form';
import {
  Button, FormFeedback, Input, Label,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import InputPasswordToggle from '@components/Input/InputPasswordToggle';
import { ArrowLeft, ArrowRight } from 'react-feather';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { useSsoEvent } from '@hooks/auth';

export default function AuthenticateMail(props: LinkEmailStepProps) {
  const { form, stepper } = props;
  const { t } = useTranslation();
  const { control, getValues, setValue } = form;
  const [errors, setErrors] = useState<Partial<Record<FieldPath<LinkEmailFormData>, string>>>({});
  const authMethod = useWatch({ control: form.control, name: 'authMethod' });
  const provider = useWatch({ control: form.control, name: 'provider' });

  const onNext = useCallback(() => {
    if (authMethod === 'password') {
      const password = getValues('password');
      yup.string().required()
        .validate(password).then(() => stepper.next())
        .catch((err: ValidationError) => {
          setErrors(err.inner.reduce((a, v) => ({ ...a, [v.path!]: v.message }), {}));
        });
    } else {
      const oauthUrl = getValues('oauthUrl');
      window.open(oauthUrl, '_blank', 'height=800,width=1000');
    }
  }, []);

  useSsoEvent<string>('mailCallback', (query) => {
    const params = new URLSearchParams(query);
    const code = params.get('code');
    const state = params.get('state');
    if (code && state) {
      setValue('authorizationCode', code);
      setValue('authorizationState', state);
      stepper.next();
    }
  });

  return (
    <>
      {authMethod === 'password' ? (
        <>
          <div className="mb-1">
            <Label className="form-label" for="country">
              {t('MAIL.PASSWORD')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle id="password" placeholder={t('MAIL.PASSWORD')} invalid={!!errors.name} {...field} />
              )}
            />
            {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
          </div>
          <div className="mb-1">
            <div className="form-check form-switch mb-1">
              <Input type="switch" id="use-inbound-username-password" onChange={(event) => setValue('type', event.target.checked ? 'manual' : 'auto')} />
              <Label className="form-check-label" for="use-inbound-username-password">
                {t('MAIL.CONFIGURE_MANUALLY')}
              </Label>
            </div>
          </div>
        </>
      ) : (
        <div>
          Click the Next button to verify your account with
          {' '}
          {provider}
        </div>
      )}
      <div className="d-flex justify-content-between mt-2">
        <Button color="secondary" outline onClick={() => stepper.prev()}>
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
