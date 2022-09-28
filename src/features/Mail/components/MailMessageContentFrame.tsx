import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export interface MailMessageContentFrameProps {
  isFetching: boolean,
  hasError: boolean,
  htmlContent: string,
  onReload: () => void,
}

export default function MailMessageContentFrame(props: MailMessageContentFrameProps) {
  const {
    isFetching, hasError, htmlContent, onReload,
  } = props;

  type IFrameSize = {
    width: number,
    height: number,
  };

  const [iframeSize, setIframeSize] = useState<IFrameSize>({ width: 0, height: 0 });
  const { t } = useTranslation();

  if (isFetching) {
    return <Skeleton count={3} />;
  }

  if (hasError) {
    return (
      <p className="text-center text-muted">
        {t('MAIL.ERROR_LOAD_MESSAGE_CONTENT')}
        <br />
        <Button className="mt-1" color="primary" onClick={onReload}>
          {t('MAIL.RELOAD')}
        </Button>
      </p>
    );
  }

  return (
    <iframe
      style={{ width: '100%', height: iframeSize.height }}
      srcDoc={htmlContent}
      title="Content"
      onLoad={(e) => {
        const { contentWindow } = e.target as HTMLIFrameElement;
        if (contentWindow) {
          const { documentElement } = contentWindow.document;
          // Trick to display for Chrome and other webkit:
          // To fit the content to iframe component, the height of iframe should be total of
          // content's height and scrollbar height. In Firefox and other mobile web browser
          // the scrollbar should overlay the content, so it's not affect to iframe height.
          // About Chrome, the horizontal scrollbar height can range anywhere from 12px to 17px.
          // Therefore, adding 17px is a solution to ensure to fit content inside iframe.
          const height = documentElement.scrollHeight + 17;
          const width = documentElement.scrollWidth;
          setIframeSize({ width, height });
        }
      }}
    />
  );
}
