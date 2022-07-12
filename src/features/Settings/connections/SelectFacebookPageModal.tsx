import {
  Button,
  Col,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalProps,
  Spinner,
} from 'reactstrap';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FacebookPageProfile } from '@domain/entities/chat/facebook/FacebookPageProfile';
import { useIsPageConnecting } from '@hooks/chat';

export interface SelectFacebookPageModalProps extends ModalProps {
  pages: FacebookPageProfile[],
  onLinkPage: (page: FacebookPageProfile) => void,
  onCancel: () => void,
}

export default function SelectFacebookPageModal(props: SelectFacebookPageModalProps) {
  const {
    pages, isOpen, toggle, onLinkPage, onCancel,
  } = props;
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState<FacebookPageProfile | undefined>();
  const connecting = useIsPageConnecting('facebook');
  const onSubmitClicked = useCallback(() => {
    if (selectedPage) {
      const page: FacebookPageProfile = { ...selectedPage };
      onLinkPage(page);
      setSelectedPage(undefined);
    }
  }, [selectedPage]);
  const onCancelClicked = useCallback(() => {
    setSelectedPage(undefined);
    onCancel();
  }, []);
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered modal-lg">
      <ModalHeader className="bg-transparent" />
      <ModalBody className="pb-3 px-sm-3">
        <h1 className="text-center mb-1">{t('PAGE.LINK_PAGE_TITLE')}</h1>
        <p className="text-center mb-2">{t('PAGE.LINK_PAGE_SUBTITLE')}</p>
        <ListGroup flush>
          {
            pages.map((page) => (
              <ListGroupItem key={page.id} className="border-0 px-0" onClick={() => setSelectedPage(page)}>
                <label htmlFor={`page_${page.id}`} className="d-flex cursor-pointer">
                  <span className="avatar-tag me-1">
                    <img className="me-1" src={page.picture} alt="" height="38" width="38" />
                  </span>
                  <span className="d-flex align-items-center justify-content-between flex-grow-1">
                    <div className="me-1">
                      <h5 className="d-block fw-bolder">{page.name}</h5>
                      <span>{page.category}</span>
                    </div>
                    <span>
                      <Input type="radio" id={`page_${page.id}`} name="categoryRadio" />
                    </span>
                  </span>
                </label>
              </ListGroupItem>
            ))
          }
        </ListGroup>
        <Col className="text-center mt-1" xs={12}>
          <Button type="submit" className="me-1" color="primary" onClick={onSubmitClicked} disabled={!selectedPage || connecting}>
            {
              connecting ? <Spinner size="sm" /> : t('PAGE.LINK')
            }
          </Button>
          <Button color="secondary" outline onClick={onCancelClicked} disabled={!selectedPage || connecting}>
            {t('PAGE.CANCEL')}
          </Button>
        </Col>
      </ModalBody>
    </Modal>
  );
}
