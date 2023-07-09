import React from 'react';
import {
  Badge, Card, CardBody, Col, Row,
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import i18n from '@config/i18n';
import { useQuery } from '@tanstack/react-query';
import { customerPresenter } from '@adapter/presenters';
import Skeleton from 'react-loading-skeleton';
import { numberArrayOf } from '@utils/ArrayUtils';
import { CustomerLevel } from '@domain/entities/customer/Customer';
import { Phone } from 'react-feather';
import { generateI18nForCustomer } from '@utils/CustomerUtils';
import { Autosum20Filled } from '@fluentui/react-icons';
import { formatCurrency, formatPhoneNumber } from '@utils/Utils';
import moment from 'moment/moment';

export interface EditCustomerPageParams {
  customerId: string,
}

const customerLevelColors: Record<CustomerLevel, string> = {
  STANDARD: 'light-success',
  VIP: 'light-warning',
  VVIP: 'light-danger',
};

function renderSkeleton() {
  return (
    <>
      {
        numberArrayOf(10).map((key) => (
          <Row className="mb-1" key={key}>
            <Col sm="3">
              <Skeleton height={36} />
            </Col>
            <Col sm="9">
              <Skeleton height={36} />
            </Col>
          </Row>
        ))
      }
    </>
  );
}

// const color: string = customerLevelColors[row.level! || CustomerLevel.STANDARD];
export default function CustomerInfoCard() {
  // const queryClient = useQueryClient();
  const { customerId } = useParams<EditCustomerPageParams>();
  const {
    data: customer,
    isLoading,
  } = useQuery(['customers', customerId], async () => customerPresenter.getCustomer(customerId));
  // const saleOptions = useAllSaleOptions();
  return (
    <div className="to-table-container">
      <Card>
        <CardBody>
          {
            isLoading ? (
              renderSkeleton()
            ) : (
              <>
                <div className="user-avatar-section">
                  <div className="d-flex align-items-center flex-column">
                    <div className="d-flex flex-column align-items-center text-center">
                      <h4>
                        {customer?.name}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around my-2 pt-75">
                  <div className="d-flex align-items-start me-2">
                    <Badge color="light-primary" className="rounded p-75">
                      <Phone className="font-medium-2" />
                    </Badge>
                    <div className="ms-75">
                      <h4 className="mb-0">{formatPhoneNumber(customer?.primaryPhoneNumber!)}</h4>
                      <small>{i18n.t('CUSTOMER.PHONE')}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <Badge color="light-primary" className="rounded p-75">
                      <Autosum20Filled className="font-medium-2" />
                    </Badge>
                    <div className="ms-75">
                      <h4 className="mb-0">{formatCurrency(customer?.revenue ?? 0)}</h4>
                      <small>
                        {i18n.t('CUSTOMER.REVENUE')}
                        {' '}
                        VND
                      </small>
                    </div>
                  </div>
                </div>
                <h4 className="fw-bolder border-bottom pb-50 mb-1">{i18n.t('COMMON.DETAILS')}</h4>
                <div className="info-container">
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <li className="mb-75">
                        <span className="fw-bolder me-25">
                          {i18n.t('CUSTOMER.CODE')}
                          :
                        </span>
                        <span>{customer?.code}</span>
                      </li>
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.LEVEL')}
                        :
                      </span>

                      <Badge color={customerLevelColors[customer?.level!]} className="text-capitalize">
                        {generateI18nForCustomer(customer?.level!)}
                      </Badge>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.EMAIL')}
                        :
                      </span>
                      <span>{customer?.email}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.HONORIFIC')}
                        :
                      </span>
                      <span>{generateI18nForCustomer(customer?.honorific)}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.ADDRESS')}
                        :
                        {' '}
                      </span>
                      <span className="text-capitalize">{customer?.address}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.SEX')}
                        :
                        {' '}
                      </span>
                      <span className="text-capitalize">{generateI18nForCustomer(customer?.sex!)}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.SOCIAL')}
                        :
                        {' '}
                      </span>
                      <span className="">
                        <a href={customer?.socialLink} target="_blank" rel="noreferrer">
                          {customer?.socialLink}
                        </a>
                      </span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.ASSIGNEE')}
                        :
                        {' '}
                      </span>
                      <span className="text-capitalize">
                        <Link
                          to={`/apps/users/${customer?.assigneeId}`}
                          className="user_name text-truncate text-body"
                        >
                          <span className="fw-bolder text-primary">
                            {`${customer?.assigneeName} - ${customer?.assigneeId}`}
                          </span>
                        </Link>
                      </span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('CUSTOMER.CREATOR')}
                        :
                        {' '}
                      </span>
                      <span className="text-capitalize">
                        <Link
                          to={`/apps/users/${customer?.creatorId}`}
                          className="user_name text-truncate text-body"
                        >
                          <span className="fw-bolder text-primary">
                            {`${customer?.creatorName} - ${customer?.creatorId}`}
                          </span>
                        </Link>
                      </span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {i18n.t('COMMON.CREATED_AT')}
                        :
                        {' '}
                      </span>
                      <span
                        className="text-capitalize"
                      >
                        {moment(customer?.createdAt).format('hh:mm:ss DD/MM/YYYY')}
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )
          }
        </CardBody>
      </Card>
    </div>
  );
}
