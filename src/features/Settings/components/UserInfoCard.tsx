import React from 'react';
import { Badge, Card, CardBody } from 'reactstrap';
import i18n from '@config/i18n';
import { Calendar, Phone } from 'react-feather';
import moment from 'moment/moment';
import { formatPhoneNumber } from '@utils/Utils';
import { userPresenter } from '@adapter/presenters';
import { useQuery } from '@tanstack/react-query';
import renderSkeleton from '@components/Skeleton/Skeleton';
import Avatar from '@components/Avatar/Avatar';
import { generateI18nForUser } from '@utils/UserUtils';

export default function UserInfoCard() {
  const {
    data: currentUser,
    isLoading,
  } = useQuery(['currentUser'], async () => userPresenter.getCurrentUser());

  const renderUserImg = () => {
    if (currentUser && currentUser.avatar) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={currentUser.avatar}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    }

    return (
      <Avatar
        color="light-success"
        className="rounded mt-3 mb-2"
        content={currentUser?.fullName}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%',
        }}
        style={{
          height: '110px',
          width: '110px',
        }}
      />
    );
  };

  return (
    <div className="to-table-container">
      { isLoading ? (
        renderSkeleton()
      ) : (
        <Card>
          <CardBody>
            <div className="user-avatar-section">
              <div className="d-flex align-items-center flex-column">
                {renderUserImg()}
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="user-info">
                    <h4>{currentUser?.fullName}</h4>
                    {currentUser && (
                      <Badge color="light-info" className="text-capitalize">
                        {`${currentUser?.firstName} ${currentUser?.lastName}`}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start my-2 pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-primary" className="rounded p-75">
                  <Phone className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">{}</h4>
                  <h4 className="mb-0">{formatPhoneNumber(currentUser?.phoneNumber!)}</h4>
                  <small>{i18n.t('USER.PHONE')}</small>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <Badge color="light-primary" className="rounded p-75">
                  <Calendar className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">{}</h4>
                  <small>
                    <h4 className="mb-0">
                      {moment(currentUser?.birthday).format('DD/MM/YYYY')}
                    </h4>
                    {i18n.t('USER.BIRTHDAY')}
                  </small>
                </div>
              </div>
            </div>
            <h4 className="fw-bolder border-bottom pb-50 mb-1">{i18n.t('COMMON.DETAILS')}</h4>
            <div className="info-container">
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('USER.SEX')}
                    :
                  </span>
                  <span className="text-lowercase">{generateI18nForUser(currentUser?.sex || 'OTHER')}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('USER.USERNAME')}
                    :
                  </span>
                  <span>{currentUser?.username}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('USER.EMAIL')}
                    :
                  </span>
                  <span>{currentUser?.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('USER.ADDRESS')}
                    :
                  </span>
                  <span>{currentUser?.address}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('USER.CREATED_AT')}
                    :
                  </span>
                  <span>{moment(currentUser?.createdAt).format('DD/MM/YYYY')}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('USER.UPDATED_AT')}
                    :
                  </span>
                  <span>{moment(currentUser?.updatedAt).format('DD/MM/YYYY')}</span>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
