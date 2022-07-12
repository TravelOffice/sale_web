import React from 'react';
import { Page } from '@domain/entities/chat/Page';
import { pageConnectionActions } from '@redux/slices/pageConnectionSlice';
import Images from '@themes/Images';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  Link as LinkIcon,
} from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Button, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';
import LinkPage from '@features/Settings/connections/LinkPage';
import SelectFacebookPageModal from '@features/Settings/connections/SelectFacebookPageModal';
import { useConnectFacebookPage, useConnectTelegramPage, useConnectZaloPage } from '@hooks/pageConnections';
import LinkTelegramModal from '@features/Settings/connections/LinkTelegramModal';

export default function ConnectionsTabContent() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    onLinkFacebookPage,
    onFacebookConnected,
    showSelectFacebookPageModal,
    facebookPages,
    onCancel: onCancelLinkFacebook,
  } = useConnectFacebookPage();

  const {
    connectZaloPage, getZaloLinkLoading,
  } = useConnectZaloPage();

  const {
    showTelegramModal,
    connectTelegram,
    onLinkTelegram,
    onCancel: onCancelLinkTelegram,
  } = useConnectTelegramPage();

  const unlinkPage = (page: Page) => {
    dispatch(pageConnectionActions.unlinkPage(page));
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">{t('PAGE.CONNECTED_PAGES')}</CardTitle>
      </CardHeader>
      <CardBody className="pt-2">
        <LinkPage
          platform="facebook"
          defaultAvatar={Images.icons.socials.facebookLogo}
          borderBottom
          paddingTop={false}
          onUnlinkPage={unlinkPage}
          customLinkButton={(
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
              autoLoad={false}
              scope="pages_messaging"
              callback={onFacebookConnected}
              render={(renderProps) => (
                <Button outline className="btn-icon" onClick={() => renderProps.onClick()}>
                  <LinkIcon className="font-medium-3" />
                </Button>
              )}
            />
          )}
        />
        <LinkPage platform="zalo" borderBottom defaultAvatar={Images.icons.socials.zaloLogo} loading={getZaloLinkLoading} onLinkPage={connectZaloPage} onUnlinkPage={unlinkPage} />
        <LinkPage platform="telegram" defaultAvatar={Images.icons.socials.telegramLogo} onLinkPage={connectTelegram} onUnlinkPage={unlinkPage} />
      </CardBody>
      <SelectFacebookPageModal
        isOpen={showSelectFacebookPageModal}
        pages={facebookPages}
        onLinkPage={onLinkFacebookPage}
        onCancel={onCancelLinkFacebook}
      />
      <LinkTelegramModal
        isOpen={showTelegramModal}
        onLinkPage={onLinkTelegram}
        onCancel={onCancelLinkTelegram}
      />
    </Card>
  );
}
