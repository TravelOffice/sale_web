import React from 'react';
import LazyImage from '@components/Image/LazyImage';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export interface ErrorMailListProps {
  onReload?: () => void,
}

export default function ErrorMailList(props: ErrorMailListProps) {
  const { onReload } = props;
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
      <LazyImage className="h-50" lazySrc={import('@assets/images/illustration/error.svg')} />
      <div className="misc-inner pt-2">
        <div className="w-100 text-center">
          <p className="mb-2 font-medium-3">{t('COMMON.SOMETHING_WENT_WRONG')}</p>
          <Button color="primary" className="btn-sm-block mb-2" onClick={onReload}>
            {t('COMMON.TRY_AGAIN')}
          </Button>
        </div>
      </div>
    </div>
  );
}
