import React, { Fragment, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Estimation } from '@domain/entities/tour/Estimation';
import { formatCurrency } from '@utils/Utils';
import { Edit, MoreVertical } from 'react-feather';
import { calPaymentEstimation } from '@utils/TousOperationUtils';
import { generateEditableUrlForSupplier } from '@utils/SupplierUtils';
import renderSkeleton from '@components/Skeleton/Skeleton';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';
import { Link } from 'react-router-dom';
import PaymentVoucherCreatePage from '@features/PaymentVoucher/components/CreatePaymentVoucher';

export interface SuppliersTableProg {
  isLoading: boolean,
  estimationsGroupBySupplier: Record<string, Estimation[]>,
  allPaymentVouchers: PaymentVoucher[],
  tourId: string,
}

export default function SuppliersTable(props: SuppliersTableProg) {
  const {
    estimationsGroupBySupplier, allPaymentVouchers, isLoading, tourId,
  } = props;
  const [createFormModal, setCreateFormModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const toggleCreateFormModal = () => {
    setCreateFormModal(!createFormModal);
  };

  let total = 0;
  let totalPaid = 0;
  let totalTourGuidePaid = 0;
  let totalRemain = 0;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {i18n.t('TOURS_OPERATION.ESTIMATION.SUPPLIERS_TABLE')}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="to-table-container">
            {
              isLoading ? (
                renderSkeleton()
              ) : (
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th style={{ minWidth: 50 }}>{i18n.t('COMMON.INDEX')}</th>
                      <th style={{ minWidth: 150 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SUPPLIER')}</th>
                      <th style={{ minWidth: 100 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SUMMARY')}</th>
                      <th style={{ minWidth: 100 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.PAID')}</th>
                      <th style={{ minWidth: 50 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.TOUR_GUIDE_PAID')}</th>
                      <th style={{ minWidth: 150 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.REMAIN')}</th>
                      <th style={{ minWidth: 250 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.PAYMENT_VOUCHER')}</th>
                      <th style={{ minWidth: 100 }}>{i18n.t('COMMON.ACTIONS')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    Object.keys(estimationsGroupBySupplier).map(
                      (supplierId, index) => {
                        const paymentVouchersBySupplier = allPaymentVouchers?.filter(
                          (item) => item.receiverId === supplierId,
                        );
                        const estimations: Estimation[] = estimationsGroupBySupplier[supplierId];
                        let totalBySupplier = 0;
                        let paidByTourGuide = 0;
                        estimations.forEach(
                          (item: Estimation) => {
                            totalBySupplier += calPaymentEstimation(item);
                            if (item.payer === 'TOUR_GUIDE') paidByTourGuide += calPaymentEstimation(item);
                          },
                        );
                        let paid: number = 0;
                        paymentVouchersBySupplier?.forEach(
                          (item: PaymentVoucher) => {
                            paid += item.amount;
                          },
                        );
                        const remain = totalBySupplier - paid;
                        total += totalBySupplier;
                        totalTourGuidePaid += paidByTourGuide;
                        totalPaid += paid;
                        totalRemain += remain;
                        return (
                          <tr key={supplierId}>
                            <td>{index + 1}</td>
                            <td>
                              <Link
                                to={generateEditableUrlForSupplier(supplierId)}
                                className="text-truncate text-body text-center"
                              >
                                <span
                                  className="fw-bolder text-primary"
                                >
                                  {estimations.length ? estimations[0].supplier?.name : ''}
                                </span>
                              </Link>
                            </td>
                            <td>
                              <span
                                className="fw-bold text-primary"
                              >
                                {formatCurrency(totalBySupplier)}
                              </span>
                            </td>
                            <td>
                              <span className="text-info">
                                {formatCurrency(paid)}
                              </span>
                            </td>
                            <td>
                              {formatCurrency(paidByTourGuide)}
                            </td>
                            <td>
                              <span className="text-danger">
                                {formatCurrency(remain)}
                              </span>
                            </td>
                            <td>
                              {
                                paymentVouchersBySupplier?.map((item) => (
                                  <Fragment key={item.code}>
                                    <span>
                                      {formatCurrency(item.amount)}
                                      {' '}
                                      (
                                      <Link
                                        to="/"
                                        className="text-truncate text-body text-center"
                                      >
                                        <span
                                          className="fw-bolder text-primary"
                                        >
                                          {item.description}
                                        </span>
                                      </Link>
                                      )
                                    </span>
                                    <br />
                                  </Fragment>
                                ))
                              }
                            </td>
                            <td>
                              <div className="column-action">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    tag="div"
                                    className="btn btn-sm"
                                  >
                                    <MoreVertical
                                      size={14}
                                      className="cursor-pointer"
                                    />
                                  </DropdownToggle>
                                  <DropdownMenu container="body">
                                    <DropdownItem
                                      tag="a"
                                      href="/"
                                      className="w-100"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedSupplierId(supplierId);
                                        toggleCreateFormModal();
                                      }}
                                    >
                                      {' '}
                                      <Edit size={14} className="me-50" />
                                      <span
                                        className="align-middle"
                                      >
                                        {i18n.t('TOURS_OPERATION.ESTIMATION.CREATE_PAYMENT_VOUCHER')}
                                      </span>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </td>
                          </tr>
                        );
                      },
                    )
                  }
                    <tr>
                      <td colSpan={2} className="text-center">
                        <span className="fw-bolder">{i18n.t('COMMON.TOTAL')}</span>
                      </td>
                      <td>
                        <span className="fw-bolder text-primary">{formatCurrency(total)}</span>
                      </td>
                      <td>
                        <span className="fw-bolder text-info">{formatCurrency(totalPaid)}</span>
                      </td>
                      <td>
                        <span className="fw-bolder">{formatCurrency(totalTourGuidePaid)}</span>
                      </td>
                      <td>
                        <span className="fw-bolder text-danger">{formatCurrency(totalRemain)}</span>
                      </td>
                      <td colSpan={2}>{' '}</td>
                    </tr>
                  </tbody>
                </Table>
              )
            }
          </div>
        </CardBody>
      </Card>
      <PaymentVoucherCreatePage
        createFormModal={createFormModal}
        toggleCreateFormModal={toggleCreateFormModal}
        receiverId={selectedSupplierId}
        tourId={tourId}
      />
    </>
  );
}
