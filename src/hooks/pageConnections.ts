import { useCallback, useEffect, useState } from 'react';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { accountConnectionPresenter } from '@adapter/presenters';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { pageConnectionActions } from '@redux/slices/pageConnectionSlice';
import { useIsPageConnecting } from '@hooks/chat';
import { useDispatch } from 'react-redux';

export const useConnectFacebookPage = () => {
  // This state represents Facebook pages that the user is admin. Only these pages can be linked.
  const [facebookPages, setFacebookPages] = useState<FacebookPageProfile[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [userAccessToken, setUserAccessToken] = useState<string | undefined>();
  const connectingFacebookPage = useIsPageConnecting('facebook');
  const dispatch = useDispatch();
  // Handle the event that the user grants permission to the web app. After
  // granting, the app can use the user's access token to access resources
  // of a user like getting their pages.
  const onFacebookConnected = (userInfo: ReactFacebookLoginInfo) => {
    setFacebookPages([]);
    const { accessToken } = userInfo;
    if (!accessToken) {
      return;
    }
    setUserAccessToken(accessToken);
    accountConnectionPresenter.getFacebookPages(accessToken).then((pages) => {
      // Show the modal that the user can choose one of pages to link
      setShowModal(true);
      setFacebookPages(pages);
    });
  };

  // Handle event that the user confirms to link their page
  const onLinkFacebookPage = useCallback((page: FacebookPageProfile) => {
    dispatch(pageConnectionActions.connectPage({
      platform: 'facebook',
      data: {
        userAccessToken: userAccessToken!,
        page,
      },
    }));
  }, [userAccessToken]);

  const onCancel = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    // Dismiss modal whenever linking completely
    if (!connectingFacebookPage) {
      setShowModal(false);
    }
  }, [connectingFacebookPage]);

  return {
    onLinkFacebookPage,
    showSelectFacebookPageModal: showModal,
    facebookPages,
    onFacebookConnected,
    onCancel,
  };
};

export const useConnectZaloPage = () => {
  const [getZaloLinkLoading, setGetZaloLinkLoading] = useState(false);
  const [zaloCallbackUrl, setZaloCallbackUrl] = useState('');
  const dispatch = useDispatch();
  const connectZaloPage = async () => {
    setGetZaloLinkLoading(true);
    const url = await accountConnectionPresenter.getZaloOAuthLink();
    setGetZaloLinkLoading(false);

    // Parse Zalo OAuth URL to retrieve the URL of SSO page which should be redirected after the
    // user grant permissions. This URL should be used to listen permission granting event
    const redirectUrl = new URL(decodeURI(new URLSearchParams(url).get('redirect_uri') || ''));
    setZaloCallbackUrl(new URL(redirectUrl).origin);
    window.open(
      url,
      '_blank',
      'height=800,width=1000',
    );
  };

  const onZaloConnected = (pageId: string, authorizationCode: string, state: string) => {
    dispatch(pageConnectionActions.connectPage({
      platform: 'zalo',
      data: { pageId, state, authorizationCode },
    }));
  };

  useEffect(() => {
    const listener = (ev: MessageEvent<any>) => {
      if (ev.origin === zaloCallbackUrl) {
        const { type, data } = ev.data as { type: string, data: any };
        if (type === 'zaloCallback') {
          const params = new URLSearchParams(data);
          const pageId = params.get('oa_id');
          const state = params.get('state');
          const authorizationCode = params.get('code');
          if (pageId && state && authorizationCode) {
            onZaloConnected(pageId, authorizationCode, state);
          }
        }
      }
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, [zaloCallbackUrl]);

  return {
    connectZaloPage,
    getZaloLinkLoading,
  };
};

export const useConnectTelegramPage = () => {
  const dispatch = useDispatch();
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const connectingTelegramPage = useIsPageConnecting('telegram');
  const connectTelegram = useCallback(() => {
    setShowTelegramModal(true);
  }, []);
  const onLinkTelegram = useCallback((botToken: string) => {
    dispatch(pageConnectionActions.connectPage({ platform: 'telegram', data: { botToken } }));
  }, []);
  const onCancel = useCallback(() => {
    setShowTelegramModal(false);
  }, []);
  useEffect(() => {
    // Dismiss modal whenever linking completed
    if (!connectingTelegramPage) {
      setShowTelegramModal(false);
    }
  }, [connectingTelegramPage]);
  return {
    showTelegramModal,
    connectTelegram,
    onLinkTelegram,
    onCancel,
  };
};
