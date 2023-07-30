import React, { useMemo } from 'react';
import {
  Badge, DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown,
} from 'reactstrap';
import i18n from '@config/i18n';
import { Link, useParams } from 'react-router-dom';

import { useSupplier } from '@hooks/supplier';
import { Estimation } from '@domain/entities/tour/Estimation';
import { formatCurrency, formatPhoneNumber, groupBy } from '@utils/Utils';
import {
  Edit, Map, MoreVertical, Phone, X,
} from 'react-feather';
import {
  calPaymentEstimation,
  calTemporaryPriceEstimation,
  calVATEstimation,
  generateI18nForTourOperation,
} from '@utils/TousOperationUtils';
import { useEstimations } from '@hooks/tourDeparture';
import { generateEditableUrlForSupplier } from '@utils/SupplierUtils';

export interface EditTourPageParams {
  tourId: string,
}

export default function EstimationListPage() {
  const { tourId } = useParams<EditTourPageParams>();
  const {
    data: allEstimations,
  } = useEstimations(tourId);

  const {
    data: allSuppliers,
  } = useSupplier();

  const estimationsWithSupplier = useMemo(() => {
    if (!allEstimations) return [];
    return allEstimations.map((estimation) => ({
      ...estimation,
      supplier: allSuppliers?.find((supplier) => supplier.code === estimation.supplierId),
    }));
  }, [allEstimations, allSuppliers]);

  const estimationsGroupByType = groupBy(
    estimationsWithSupplier, (estimation: Estimation) => estimation.supplierServiceType,
  );

  return (
    <div className="to-table-container">
      <Table bordered responsive>
        <thead>
          <tr>
            <th style={{ minWidth: 50 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_TYPE')}</th>
            <th style={{ minWidth: 250 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SUPPLIER')}</th>
            <th style={{ minWidth: 150 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_NAME')}</th>
            <th style={{ minWidth: 250 }}>{i18n.t('COMMON.DETAILS')}</th>
            <th style={{ minWidth: 100 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.TEMPORARY_CALCULATED')}</th>
            <th style={{ minWidth: 100 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.TOTAL_VAT')}</th>
            <th style={{ minWidth: 150 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.PAYMENT')}</th>
            <th style={{ minWidth: 150 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.PAYER')}</th>
            <th style={{ minWidth: 250 }}>{i18n.t('COMMON.NOTE')}</th>
            <th style={{ minWidth: 100 }}>{i18n.t('COMMON.ACTIONS')}</th>
          </tr>
        </thead>
        <tbody>
          {
          Object.keys(estimationsGroupByType).map((type) => {
            const estimationsGroupBySupplier = groupBy(
              estimationsGroupByType[type], (item: Estimation) => item.supplierId,
            );
            return Object.keys(estimationsGroupBySupplier).map((supplierId, supplierIndex) => {
              const estimations = estimationsGroupBySupplier[supplierId];
              return estimations.map((estimation: Estimation, index) => {
                const { supplier } = estimation;
                return (
                  <tr>
                    {
                      supplierIndex === 0 && index === 0 ? (
                        <td rowSpan={estimationsGroupByType[type].length}>
                          <Badge pill color="light-primary">
                            {generateI18nForTourOperation(`ESTIMATION.${type}`)}
                          </Badge>
                        </td>
                      ) : <></>
                    }
                    {
                      index === 0 ? (
                        <td rowSpan={estimations.length}>
                          <Link
                            to={generateEditableUrlForSupplier(estimation.supplier!)}
                            className="text-truncate text-body text-center"
                          >
                            <span className="fw-bolder text-primary">{supplier?.name}</span>
                          </Link>
                          {' '}
                          <br />
                          {
                            estimation.supplier?.address ? (
                              <div className="align-middle">
                                <Map size={14} />
                                {' '}
                                {estimation.supplier?.address}
                              </div>
                            ) : <></>
                          }
                          <div className="align-middle">
                            <Phone size={14} />
                            {' '}
                            {formatPhoneNumber(estimation?.supplier?.contacts?.pop()?.phoneNumber!)}
                          </div>
                        </td>
                      ) : <></>
                    }
                    <td>{estimation.name}</td>
                    <td>
                      <span className="fw-bold">{i18n.t('TOURS_OPERATION.ESTIMATION.PRICE')}</span>
                      {': '}
                      <span className="text-warning">{formatCurrency(estimation.estimatedPrice)}</span>
                      <br />
                      <span className="fw-bold">{i18n.t('TOURS_OPERATION.ESTIMATION.QUANTITY')}</span>
                      {': '}
                      {estimation.estimatedQuantity}
                      <br />
                      {
                        estimation.vatStatus === 'VAT_INCLUDED' ? (
                          <span className="fst-italic text-success">
                            (
                            {
                              generateI18nForTourOperation(`ESTIMATION.${estimation.vatStatus}`)
                            }
                            )
                          </span>
                        ) : (
                          <span className="fst-italic">
                            (
                            {
                              generateI18nForTourOperation(`ESTIMATION.${estimation.vatStatus}`)
                            }
                            )
                          </span>
                        )
                      }

                    </td>
                    <td>{formatCurrency(calTemporaryPriceEstimation(estimation))}</td>
                    <td>{formatCurrency(calVATEstimation(estimation))}</td>
                    <td>{formatCurrency(calPaymentEstimation(estimation))}</td>
                    <td>{generateI18nForTourOperation(`ESTIMATION.${estimation.payer}`)}</td>
                    <td>{estimation.note}</td>
                    <td>
                      <div className="column-action">
                        <UncontrolledDropdown>
                          <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical size={14} className="cursor-pointer" />
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
                              <span className="align-middle">{i18n.t('COMMON.EDIT')}</span>
                            </DropdownItem>
                            <DropdownItem
                              tag="a"
                              href="/"
                              className="w-100"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <X size={14} className="me-50" />
                              <span className="align-middle">{i18n.t('COMMON.DELETE')}</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </td>
                  </tr>
                );
              });
            });
          })
        }
        </tbody>
      </Table>
    </div>
  );
}
