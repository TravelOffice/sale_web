import React, { useState } from 'react';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Input,
  ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader,
} from 'reactstrap';
import Images from '@themes/Images';
import {
  Link as LinkIcon,
} from 'react-feather';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { accountConnectionPresenter } from '@adapter/presenters';
import { FacebookPage } from '@domain/entities/FacebookPage';
import toasty from '@components/Toasty/Toasty';

export default function ConnectionsTabContent() {
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<FacebookPage | undefined>();
  // const [userAccessToken, setUserAccessToken] = useState<string | undefined>();

  // Handle event that the user grants permission to the web app. After
  // granting, the app can use the user's access token to access resources
  // of user like getting their pages.
  const onFacebookConnected = (userInfo: ReactFacebookLoginInfo) => {
    setPages([]);
    const { accessToken } = userInfo;
    if (!accessToken) {
      return;
    }
    setUserAccessToken(accessToken);
    accountConnectionPresenter.getFacebookPages(accessToken).then((facebookPages) => {
      // Show the modal that the user can choose one of pages to link
      setShowModal(true);
      setPages(facebookPages);
    });
  };

  // Handle event that the user confirms to link their page
  const onSubmit = () => {
    setShowModal(false);
    // TODO: dispatch an action to link the Facebook page, using selectedPage and user access token
    toasty.show({ title: 'Success', type: 'success', message: `Link ${selectedPage?.name} successfully` });
  };
  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">Connected accounts</CardTitle>
      </CardHeader>
      <CardBody className="pt-2">
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img className="me-1" src={Images.facebookLogo} alt="" height="38" width="38" />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0">Facebook</p>
              <span>Not Connected</span>
            </div>
            <div className="mt-50 mt-sm-0">
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
            </div>
          </div>
        </div>
      </CardBody>
      <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} className="modal-dialog-centered modal-lg">
        <ModalHeader className="bg-transparent" toggle={() => setShowModal(!showModal)} />
        <ModalBody className="pb-3 px-sm-3">
          <h1 className="text-center mb-1">Link your page</h1>
          <p className="text-center mb-2">Select which one you want to link</p>
          <ListGroup flush>
            {
              pages.map((page) => (
                <ListGroupItem key={page.id} className="border-0 px-0" onClick={() => setSelectedPage(page)}>
                  <label htmlFor="crmRadio" className="d-flex cursor-pointer">
                    <span className="avatar-tag me-1">
                      <img className="me-1" src={page.picture} alt="" height="38" width="38" />
                    </span>
                    <span className="d-flex align-items-center justify-content-between flex-grow-1">
                      <div className="me-1">
                        <h5 className="d-block fw-bolder">{page.name}</h5>
                        <span>{page.category}</span>
                      </div>
                      <span>
                        <Input type="radio" id="crmRadio" name="categoryRadio" />
                      </span>
                    </span>
                  </label>
                </ListGroupItem>
              ))
            }
          </ListGroup>
          <Col className="text-center mt-1" xs={12}>
            <Button type="submit" className="me-1" color="primary" onClick={onSubmit}>
              Link
            </Button>
            <Button color="secondary" outline onClick={() => setShowModal(!showModal)}>
              Cancel
            </Button>
          </Col>
        </ModalBody>
      </Modal>
    </Card>
  );
}
