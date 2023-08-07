import React from 'react';
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
import { Link } from 'react-router-dom';
import { Estimation } from '@domain/entities/tour/Estimation';
import { formatCurrency } from '@utils/Utils';
import { Edit, MoreVertical } from 'react-feather';
import { calPaymentEstimation } from '@utils/TousOperationUtils';
import { generateEditableUrlForSupplier } from '@utils/SupplierUtils';
import renderSkeleton from '@components/Skeleton/Skeleton';
import { PaymentVoucher } from '@domain/entities/paymentVoucher/PaymentVoucher';

export interface SuppliersTableProg {
  isLoading: boolean,
  estimationsGroupBySupplier: Record<string, Estimation[]>,
  allPaymentVouchers: PaymentVoucher[],
}

export default function SuppliersTable(props: SuppliersTableProg) {
  const { estimationsGroupBySupplier, allPaymentVouchers, isLoading } = props;

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
                        let summaryBySupplier = 0;
                        estimations.forEach(
                          (item: Estimation) => {
                            summaryBySupplier += calPaymentEstimation(item);
                          },
                        );
                        let summaryPaid: number = 0;
                        paymentVouchersBySupplier?.forEach(
                          (item: PaymentVoucher) => {
                            summaryPaid += item.amount;
                          },
                        );
                        const remain = summaryBySupplier - summaryPaid;
                        return (
                          <tr>
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
                                {formatCurrency(summaryBySupplier)}
                              </span>
                            </td>
                            <td>
                              <span className="text-info">
                                {formatCurrency(summaryPaid)}
                              </span>
                            </td>
                            <td>0</td>
                            <td>
                              <span className="text-danger">
                                {formatCurrency(remain)}
                              </span>
                            </td>
                            <td>
                              {
                                paymentVouchersBySupplier?.map((item) => (
                                  <>
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
                                  </>
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
                                      }}
                                    >
                                      {' '}
                                      <Edit size={14} className="me-50" />
                                      <span
                                        className="align-middle"
                                      >
                                        {i18n.t('COMMON.EDIT')}
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
                  </tbody>
                </Table>
              )
            }
          </div>
        </CardBody>
      </Card>
    </>
  );
}
