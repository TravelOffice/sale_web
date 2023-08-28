import React from 'react';
import {
  Badge, Breadcrumb, BreadcrumbItem, Card, CardBody, Col, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import { useQuery } from '@tanstack/react-query';
import { userPresenter } from '@adapter/presenters';
import { Link, useParams } from 'react-router-dom';
import { generateI18nForUser, generateUserDisplayName } from '@utils/UserUtils';
import moment from 'moment';
import Avatar from '@components/Avatar/Avatar';
import renderSkeleton from '@components/Skeleton/Skeleton';

export interface UserDetailProps {
  userId: string;
}

export default function UserDetail() {
  const { userId } = useParams<UserDetailProps>();

  const {
    data: user,
    isLoading,
  } = useQuery(['users', userId], async () => userPresenter.getUser(userId));

  const renderUserImg = () => {
    if (user && user.avatar) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={user.avatar}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    }

    return (
      <Avatar
        color="light-success"
        className="rounded mt-3 mb-2"
        content={user?.fullName}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%',
        }}
        style={{
          height: '150px',
          width: '150px',
        }}
      />
    );
  };

  return (
    <div className="to-table-container">
      <Row>
        <Col md={12}>
          <Breadcrumb className="ms-1 mb-1">
            <BreadcrumbItem>
              <Link to="/">{i18n.t('COMMON.HOME')}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/admin/user/list">{i18n.t('USER.USER_LIST')}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <span>{i18n.t('USER.USER_DETAILS')}</span>
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      {isLoading ? (
        renderSkeleton()
      ) : (
        <Row>
          <Col md={4}>
            <Card>
              <CardBody>
                <div className="user-avatar-section">
                  <div className="d-flex align-items-center flex-column">
                    {renderUserImg()}
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="user-info">
                        {user && (
                        <Badge color="light-info" className="text-capitalize">
                          { generateUserDisplayName(user)}
                        </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <CardBody>
                <h4 className="fw-bolder border-bottom pb-50 mb-1">{i18n.t('COMMON.DETAILS')}</h4>
                <div className="info-container">
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.FIRSTNAME')}
                        :
                      </span>
                      <span className="text-capitalize">{user?.firstName}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.LASTNAME')}
                        :
                      </span>
                      <span className="text-capitalize">{user?.lastName}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.PHONE')}
                        :
                      </span>
                      <span className="text-lowercase">{user?.phoneNumber}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.BIRTHDAY')}
                        :
                      </span>
                      <span className="text-lowercase">{moment(user?.birthday).format('DD/MM/YYYY')}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.SEX')}
                        :
                      </span>
                      <span className="text-capitalize">{generateI18nForUser(user?.sex || 'OTHER')}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.USERNAME')}
                        :
                      </span>
                      <span>{user?.username}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.EMAIL')}
                        :
                      </span>
                      <span>{user?.email}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.ADDRESS')}
                        :
                      </span>
                      <span>{user?.address}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.ROLE')}
                        :
                      </span>
                      <ul>
                        {user?.roles.map((role) => (
                          <li>
                            <span>
                              { generateI18nForUser(`DEFAULT_ROLES.${role}`) }
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.CREATED_AT')}
                        :
                      </span>
                      <span>{moment(user?.createdAt).format('DD/MM/YYYY')}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('USER.UPDATED_AT')}
                        :
                      </span>
                      <span>{moment(user?.updatedAt).format('DD/MM/YYYY')}</span>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
