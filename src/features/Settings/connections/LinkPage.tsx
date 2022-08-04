import React, { ReactNode, useMemo } from 'react';
import { Page } from '@domain/entities/chat/Page';
import { Button, Spinner } from 'reactstrap';
import { Link as LinkIcon, X } from 'react-feather';
import { useIsPageConnecting, usePage } from '@hooks/chat';
import { ChatPlatform } from '@domain/entities/chat/ChatPlatform';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '@utils/CommonUtils';
import { useAccessControl } from '@hooks/auth';
import PERMISSIONS from '@utils/PermissionUtils';

export interface LinkPageProps {
  platform: ChatPlatform,
  onLinkPage?: () => void,
  onUnlinkPage?: (page: Page) => void,
  customLinkButton?: ReactNode,
  defaultAvatar: string,
  loading?: boolean,
  borderBottom?: boolean,
  paddingTop?: boolean,
}

function renderLinkButton(props: LinkPageProps, connecting: boolean) {
  const { customLinkButton, onLinkPage, loading } = props;
  const { can } = useAccessControl();
  if (!can(PERMISSIONS.link_page)) {
    return <></>;
  }
  if (customLinkButton) {
    // Render custom link button such as ReactFacebookLogin
    return customLinkButton;
  }
  // Render default link button
  return (
    <Button outline className="btn-icon" disabled={connecting} onClick={onLinkPage}>
      {
        (connecting || loading) ? (
          <Spinner style={{ width: '1.3rem', height: '1.3rem' }} />
        ) : (
          <LinkIcon className="font-medium-3" />
        )
      }
    </Button>
  );
}

function renderUnlinkButton(props: LinkPageProps, page: Page) {
  const { onUnlinkPage } = props;
  const { can } = useAccessControl();
  if (!can(PERMISSIONS.unlink_page)) {
    return <></>;
  }
  return (
    <Button outline className="btn-icon btn-outline-danger" onClick={() => onUnlinkPage?.(page)}>
      <X color="red" className="font-medium-3" />
    </Button>
  );
}

export default function LinkPage(props: LinkPageProps) {
  const {
    platform, defaultAvatar, borderBottom, paddingTop = true,
  } = props;
  const { t } = useTranslation();
  const page = usePage(platform);
  const connecting = useIsPageConnecting(platform);
  const status = useMemo(() => {
    if (connecting) {
      return t('PAGE.CONNECTING');
    }
    if (!page) {
      return t('PAGE.NOT_CONNECTED');
    }
    return page.name;
  }, [connecting, page]);

  return (
    <>
      <div className={classNames('d-flex', { 'mt-2': paddingTop }, { 'pb-2 border-bottom': borderBottom })}>
        <div className="flex-shrink-0">
          <img
            className="me-1"
            src={page?.avatar || defaultAvatar}
            alt=""
            height="38"
            width="38"
          />
        </div>
        <div className="d-flex align-item-center justify-content-between flex-grow-1">
          <div className="me-1">
            <p className="fw-bolder mb-0">{capitalizeFirstLetter(platform)}</p>
            <span>{status}</span>
          </div>
          <div className="mt-50 mt-sm-0">
            {
              page ? renderUnlinkButton(props, page) : renderLinkButton(props, connecting)
            }
          </div>
        </div>
      </div>
    </>
  );
}
