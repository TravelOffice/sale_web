import React, { useMemo, useState } from 'react';
import Wizard, { WizardStep } from '@components/Wizard/Wizard';
import i18n from '@config/i18n';
import { ArrowDown, Check } from 'react-feather';
import ManualConfigureIncomingServer from '@features/Settings/connections/mail/ManualConfigureIncomingServer';
import ManualConfigureOutgoingServer from '@features/Settings/connections/mail/ManualConfigureOutgoingServer';
import ManualConfigureReview from '@features/Settings/connections/mail/ManualConfigureReview';
import Stepper from '@utils/Stepper';
import { ConfigureMailAccountStepProps } from '@features/Settings/connections/mail/ConfigureMailAccountStepProps';
import { MailAccount } from '@domain/entities/mail/MailAccount';

export default function ManualConfigureEmail(props: ConfigureMailAccountStepProps<MailAccount>) {
  const { form, onNext } = props;
  const [stepper] = useState<Stepper>(new Stepper());

  const steps: WizardStep[] = useMemo(() => [
    {
      id: 'inbound',
      title: i18n.t('MAIL.CONFIGURE_INBOUND'),
      subtitle: i18n.t('MAIL.CONFIGURE_INBOUND_SUBTITLE'),
      icon: <ArrowDown className="font-medium-3" />,
      content: <ManualConfigureIncomingServer form={form} stepper={stepper} />,
    },
    {
      id: 'outbound',
      title: i18n.t('MAIL.CONFIGURE_OUTBOUND'),
      subtitle: i18n.t('MAIL.CONFIGURE_OUTBOUND_SUBTITLE'),
      icon: <ArrowDown className="font-medium-3 rotate-180" />,
      content: <ManualConfigureOutgoingServer form={form} stepper={stepper} />,
    },
    {
      id: 'review',
      title: i18n.t('MAIL.SUBMIT'),
      subtitle: i18n.t('MAIL.SUBMIT_SUBTITLE'),
      icon: <Check className="font-medium-3" />,
      content: <ManualConfigureReview form={form} stepper={stepper} onCompleted={onNext} />,
    },
  ], [form, stepper]);
  return (
    <>
      <Wizard
        type="vertical"
        headerClassName="border-0"
        contentClassName="shadow-none"
        steps={steps}
        stepper={stepper}
        className="bg-transparent create-app-wizard shadow-none"
      />
    </>
  );
}
