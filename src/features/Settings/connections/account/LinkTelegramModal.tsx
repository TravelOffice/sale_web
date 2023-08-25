import React, { useCallback, useState } from 'react';
import {
  Badge, Button, Col, Input, Modal, ModalBody, ModalHeader, ModalProps, Spinner,
} from 'reactstrap';
import { Trans, useTranslation } from 'react-i18next';
import { Youtube } from 'react-feather';
import { useIsPageConnecting } from '@hooks/chat';

export interface LinkTelegramModalProps extends ModalProps {
  onLinkPage: (botToken: string) => void,
  onCancel: () => void,
}

export default function LinkTelegramModal(props: LinkTelegramModalProps) {
  const { t } = useTranslation();
  const { isOpen, onLinkPage, onCancel } = props;
  const connecting = useIsPageConnecting('telegram');
  const [botToken, setBotToken] = useState('');
  const onSubmit = useCallback(() => {
    onLinkPage(botToken);
  }, [botToken]);
  const onDismissModal = useCallback(() => {
    setBotToken('');
    onCancel();
  }, []);
  return (
    <Modal isOpen={isOpen} className="modal-dialog-centered modal-lg" onClosed={onDismissModal}>
      <ModalHeader className="bg-transparent" />
      <ModalBody className="pb-3 px-sm-3">
        <h1 className="text-center mb-1">{t('PAGE.CONNECT_TELEGRAM')}</h1>
        <p className="text-center mb-2">{t('PAGE.CONNECT_TELEGRAM_DESCRIPTION')}</p>
        <span className="d-flex flex-row align-items-center justify-content-center">
          <Youtube color="#7367f0" />
          <a
            target="_blank"
            style={{ marginLeft: 5 }}
            href={process.env.CONNECT_TELEGRAM_VIDEO_TUTORIAL_URL}
            rel="noreferrer"
          >
            {t('PAGE.CONNECT_TELEGRAM_VIDEO_TUTORIAL')}
          </a>
        </span>
        <ol className="mt-2">
          <li className="pb-1">
            <Trans i18nKey="PAGE.LINK_TELEGRAM_INSTRUCTIONS.MESSAGE_TO_BOT_FATHER">
              Message the
              {' '}
              <a href="https://web.telegram.org/k/#@BotFather" target="_blank" rel="noreferrer">BotFather</a>
              {' '}
              on Telegram.
            </Trans>
          </li>
          <li className="pb-1">
            <Trans i18nKey="PAGE.LINK_TELEGRAM_INSTRUCTIONS.SEND_COMMAND_AND_SELECT_BOT">
              Send the command
              {' '}
              <Badge color="primary">/mybots</Badge>
              {' '}
              and select the bot to connect.
            </Trans>
          </li>
          <li className="pb-1">
            <Trans i18nKey="PAGE.LINK_TELEGRAM_INSTRUCTIONS.SELECT_API_TOKEN">
              Select
              {' '}
              <b>API Token</b>
              .
            </Trans>
          </li>
          <li>
            <Trans i18nKey="PAGE.LINK_TELEGRAM_INSTRUCTIONS.FILL_API_TOKEN">
              Find the
              {' '}
              <b>API Token</b>
              {' '}
              and add it below.
            </Trans>
          </li>
        </ol>
        <Input
          placeholder={t('PAGE.ENTER_BOT_TOKEN_PLACEHOLDER')}
          onChange={(event) => setBotToken(event.target.value)}
        />
        <Col className="text-center mt-1" xs={12}>
          <Button type="submit" className="me-1" color="primary" onClick={onSubmit} disabled={connecting || !botToken}>
            {
              connecting ? <Spinner size="sm" /> : t('PAGE.LINK')
            }
          </Button>
          <Button color="secondary" outline onClick={onDismissModal} disabled={connecting}>
            {t('PAGE.CANCEL')}
          </Button>
        </Col>
      </ModalBody>
    </Modal>
  );
}
