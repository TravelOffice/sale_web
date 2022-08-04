import React from 'react';
import { useSkin } from '@hooks/layout';
import Images from '@themes/Images';
import '@styles/base/pages/page-misc.scss';
import i18n from '@config/i18n';

const NotAuthorized = React.memo(() => {
  const { skin } = useSkin();
  const illustration = skin === 'dark' ? Images.pages.notAuthorizedDark : Images.pages.notAuthorized;
  return (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{i18n.t('COMMON.NOT_AUTHORIZED_TITLE')}</h2>
          <img className="img-fluid pt-2" src={illustration} alt="" />
        </div>
      </div>
    </div>
  );
});

export default NotAuthorized;
