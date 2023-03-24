import React, { useCallback } from 'react';
import { MailServer } from '@domain/entities/mail/MailServer';
import LoadingButton from '@components/LoadingButton/LoadingButton';
import { useTranslation } from 'react-i18next';
import { ConfigureMailAccountStepProps } from '@features/Settings/connections/mail/ConfigureMailAccountStepProps';
import { Controller } from 'react-hook-form';
import { mailPresenter } from '@adapter/presenters';
import { AutoLinkEmailRequest } from '@domain/entities/mail/AutoLinkEmailRequest';
import InputPasswordToggle from '@components/Input/InputPasswordToggle';
import toasty from '@components/Toasty/Toasty';
import { useSsoEvent } from '@hooks/auth';
import { useMutation } from '@tanstack/react-query';
import { FormFeedback, Label } from 'reactstrap';
import { LinkEmailFormData } from '@domain/entities/formData/LinkEmailFormData';
import * as yup from 'yup';
import { useYupValidation } from '@hooks/common';
import i18n from '@config/i18n';
import Images from '@themes/Images';
import { showLinkMailAccountSuccessfully } from '@utils/MailUtils';

export interface AutoConfigureEmailProps extends ConfigureMailAccountStepProps {
  mailServer: MailServer,
  onManualConfig: () => void,
}

const schema = yup.object().shape({
  password: yup.string().required(i18n.t('COMMON.FIELD_IS_REQUIRED', { field: i18n.t('MAIL.PASSWORD') })),
});

export default function AutoConfigureEmail(props: AutoConfigureEmailProps) {
  const {
    onManualConfig, mailServer, form, onNext,
  } = props;
  const { t } = useTranslation();
  const { errors, validate, clearErrors } = useYupValidation<LinkEmailFormData>();
  const { control, getValues } = form;

  const { name: mailServerName, incoming, oauthUrl } = mailServer;
  const { authentication_method: authMethod } = incoming;

  const linkEmailMutation = useMutation({
    mutationFn: (request: AutoLinkEmailRequest) => mailPresenter.autoLinkEmail(request),
    onError: (error: Error) => {
      toasty.show({
        type: 'error',
        title: t('COMMON.ERROR'),
        message: error.message,
      });
    },
    onSuccess: (_, payload) => {
      showLinkMailAccountSuccessfully(payload.email);
      onNext();
    },
  });

  /**
   * Method to handle signing in using OAuth2 method, such as Gmail, Outlook,...
   */
  const handleOAuth2SignIn = useCallback(() => {
    window.open(oauthUrl, '_blank', 'height=800,width=1000');
  }, []);

  /**
   * Method to handle signing in with password
   */
  const handleSignInWithPassword = useCallback(() => {
    const [name, mailAddress, password] = getValues(['name', 'email', 'password']);
    // Validate user input is valid
    const isValid = validate(schema, { password });
    if (!isValid) return;
    linkEmailMutation.mutate({
      name,
      email: mailAddress,
      password,
    });
  }, []);

  const handleOnNext = useCallback(() => {
    clearErrors();
    if (authMethod === 'password') {
      handleSignInWithPassword();
    } else if (authMethod === 'oauth2') {
      handleOAuth2SignIn();
    }
  }, [authMethod]);

  /**
   * Wait for SSO page pushing event, then perform linking mail account
   */
  useSsoEvent<string>('mailCallback', (query) => {
    const params = new URLSearchParams(query);
    const code = params.get('code');
    const state = params.get('state');
    if (code && state) {
      const [name, mailAddress] = getValues(['name', 'email', 'password']);
      linkEmailMutation.mutate({
        name,
        email: mailAddress,
        code,
        state,
      });
    }
  });

  return (
    <div className="d-flex flex-column">
      <img src={Images.illustration.email} alt="" width="50%" className="mx-auto" />
      {
        authMethod === 'password' && (
          <div className="mb-1">
            <Label className="form-label">
              {t('MAIL.PASSWORD')}
              {' '}
              <span className="text-danger">*</span>
            </Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <InputPasswordToggle placeholder={t('MAIL.PASSWORD')} invalid={!!errors.password} {...field} />
              )}
            />
            {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
          </div>
        )
      }

      <div className="mt-2 d-flex flex-row justify-content-between align-items-center">
        <span className="text-decoration-underline cursor-pointer" onClick={onManualConfig}>{t('MAIL.CONFIGURE_MANUALLY')}</span>

        <LoadingButton color="primary" onClick={handleOnNext} loading={linkEmailMutation.isLoading} disabled={linkEmailMutation.isLoading}>
          {authMethod === 'oauth2' ? t('MAIL.SIGN_IN_WITH', { name: mailServerName }) : t('COMMON.NEXT_STEP')}
        </LoadingButton>
      </div>
    </div>
  );
}
