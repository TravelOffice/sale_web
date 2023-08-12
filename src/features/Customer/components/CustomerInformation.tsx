// ** React Imports
import Avatar from '@components/Avatar/Avatar';
import i18n from '@config/i18n';
import React from 'react';
import {
  Briefcase, Mail, MapPin, Phone, Target,
} from 'react-feather';
// ** Reactstrap Imports
import {
  Badge, Button, Card, CardBody,
} from 'reactstrap';
import { Customer } from '@domain/entities/customer/Customer';

interface CustomerInformationProps {
  // eslint-disable-next-line react/require-default-props
  customer?: Customer,
}

const levelColors = {
  STANDARD: 'light-info',
  VIP: 'light-warning',
  VVIP: 'light-danger',
};

const CustomerInformation = (props: CustomerInformationProps) => {
  const { customer } = props;

  // ** render lead img
  const renderUserImg = () => (
    <Avatar
      color="light-primary"
      className="rounded mt-3 mb-2"
      content={customer?.name}
      contentStyles={{
        borderRadius: 0,
        fontSize: '48px',
        width: '100%',
        height: '100%',
      }}
      style={{
        height: '110px',
        width: '110px',
      }}
    />
  );

  return (
    <>
      <Card>
        {customer && (
          <CardBody>
            <div className="user-avatar-section">
              <div className="d-flex align-items-center flex-column">
                {renderUserImg()}
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="user-info">
                    <h4>{`(${i18n.t(`CUSTOMER.${customer.honorific}`)}) ${customer.name}`}</h4>
                    <Badge color={levelColors[customer.level]} className="text-capitalize">
                      {`${i18n.t(`CUSTOMER.${customer.level}`)}`}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-primary" className="rounded p-75">
                  <Target className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">###</h4>
                  {/* TODO: This field will be implemented later */}
                  <small>Total Opportunity</small>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <Badge color="light-primary" className="rounded p-75">
                  <Briefcase className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">###</h4>
                  {/* TODO: This field will be implemented later */}
                  <small>Total Booking</small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2 pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-info" className="rounded">
                  <Mail />
                </Badge>
                <div className="ms-75">
                  <h6>{customer.email}</h6>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-info" className="rounded">
                  <Phone />
                </Badge>
                <div className="ms-75">
                  <h6>{customer.primaryPhoneNumber}</h6>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2 pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-info" className="rounded">
                  <MapPin />
                </Badge>
                <div className="ms-75">
                  <h6>{customer.address}</h6>
                </div>
              </div>
            </div>
            <h4 className="fw-bolder border-bottom pb-50 mb-1">
              {i18n.t('COMMON.INFORMATION')}
              {' '}
              Lead
            </h4>
            <div className="info-container">
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('CUSTOMER.CONTACT')}
                    {': '}
                  </span>
                  <span>
                    {customer.otherPhoneNumbers?.join(', ')}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('LEAD.BIRTHDAY')}
                    {': '}
                  </span>
                  <span>{customer.birthday}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('CUSTOMER.SEX')}
                    {': '}
                  </span>
                  <span>{`${i18n.t(`LEAD.${customer.sex}`)}`}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('CUSTOMER.SOURCE')}
                    {': '}
                  </span>
                  <span>{`${i18n.t(`LEAD.${customer.sourceName}`)}`}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('CUSTOMER.MARITAL')}
                    {': '}
                  </span>
                  <span>{`${i18n.t(`LEAD.${customer.maritalStatus}`)}`}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('CUSTOMER.TAGS')}
                    {': '}
                  </span>
                  <span>
                    {customer.tags?.map((value) => (
                      <Badge key={value} color="light-info">
                        {`#${value} `}
                      </Badge>
                    ))}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">
                    {i18n.t('LEAD.NATIONALITY')}
                    {': '}
                  </span>
                  <span>{customer.nationality}</span>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center pt-2">
              <Button
                color="primary"
                onClick={() => {
                }}
              >
                {i18n.t('COMMON.EDIT')}
              </Button>
            </div>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default CustomerInformation;
