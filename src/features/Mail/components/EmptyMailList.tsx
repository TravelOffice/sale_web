import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EmptyMailList() {
  const { t } = useTranslation();
  return (
    <div className="no-results d-block">
      <h5>{t('MAIL.NO_MAILS_FOUND')}</h5>
    </div>
  );
}
