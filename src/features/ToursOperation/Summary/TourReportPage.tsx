import React, { useMemo, useState } from 'react';
import {
  Badge,
  Button,
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
import EstimationCreatePage from '@features/ToursOperation/Estimation/EstimationCreatePage';
import renderSkeleton from '@components/Skeleton/Skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import EstimationUpdatePage from '@features/ToursOperation/Estimation/EstimationUpdatePage';

export interface EditTourPageParams {
  tourId: string,
}

export default function TourReportPage() {
  const queryClient = useQueryClient();
  const { tourId } = useParams<EditTourPageParams>();
  const {
    data: allEstimations,
    isLoading: isLoadingEstimations,
  } = useEstimations(tourId);

  const {
    data: allSuppliers,
    isLoading: isLoadingSuppliers,
  } = useSupplier();

  const estimationsWithSupplier = useMemo(() => {
    if (!allEstimations || !allSuppliers) return [];
    return allEstimations.map((estimation: Estimation) => ({
      ...estimation,
      supplier: allSuppliers.find((supplier) => supplier.code === estimation.supplierId),
    }));
  }, [allEstimations, allSuppliers]);

  const estimationsGroupByType = useMemo(() => groupBy(
    estimationsWithSupplier ?? [], (estimation: Estimation) => estimation.serviceType,
  ), [estimationsWithSupplier]);

  const [createFormModal, setCreateFormModal] = useState(false);
  const [updateFormData, setUpdateFormModal] = useState(false);
  const [selectedEstimation, setSelectedEstimation] = useState<Estimation | undefined>(undefined);
  const toggleCreatFormModal = () => {
    setCreateFormModal(!createFormModal);
  };

  const toggleUpdateFormModal = () => {
    setUpdateFormModal(!updateFormData);
  };
  const { mutate } = useMutation({
    mutationKey: ['deleteEstimation'],
    mutationFn: async () => tourPresenter.deleteEstimation(tourId, selectedEstimation?.code!),
    onSuccess: () => {
      toasty.show({
        title: i18n.t('COMMON.SUCCESS'),
        type: 'success',
        message: i18n.t('TOURS_OPERATION.ESTIMATION.DELETE_ESTIMATION_SUCCESSFULLY'),
      });
      queryClient.setQueryData(['estimations', tourId], (
        estimations: Estimation[] | undefined,
      ) => estimations?.filter((estimation) => estimation.code !== selectedEstimation?.code));
    },
    onError: (error) => {
      toasty.show({
        title: i18n.t('COMMON.ERROR'),
        type: 'error',
        message: `${error}`,
      });
    },
  });

  const handleDeleteEstimation = () => {
    mutate();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {i18n.t('TOURS_OPERATION.ESTIMATION.TABLE')}
          </CardTitle>
          <div className="d-flex align-items-center table-header-actions">
            <Button color="primary" onClick={toggleCreatFormModal}>
              {i18n.t('COMMON.ADD')}
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="to-table-container">
            {
              isLoadingEstimations && isLoadingSuppliers ? (
                renderSkeleton()
              ) : (
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th style={{ minWidth: 50 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_TYPE')}</th>
                      <th style={{ minWidth: 250 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SUPPLIER')}</th>
                      <th style={{ minWidth: 150 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_NAME')}</th>
                      <th style={{ minWidth: 250 }}>{i18n.t('COMMON.DETAILS')}</th>
                      <th style={{ minWidth: 250 }}>{i18n.t('COMMON.SUMMARY')}</th>
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
                      return Object.keys(estimationsGroupBySupplier).map(
                        (supplierId, supplierIndex) => {
                          const estimations = estimationsGroupBySupplier[supplierId];
                          return estimations.map((estimation: Estimation, index) => {
                            const { supplier } = estimation;
                            return (
                              <tr key={supplierId}>
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
                                        to={
                                          generateEditableUrlForSupplier(estimation.supplier?.code!)
                                        }
                                        className="text-truncate text-body text-center"
                                      >
                                        <span
                                          className="fw-bolder text-primary"
                                        >
                                          {supplier?.name}
                                        </span>
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
                                      {
                                        estimation.supplier?.contacts
                                        && estimation.supplier.contacts.length ? (
                                          <div className="align-middle">
                                            <Phone size={14} />
                                            {' '}
                                            {formatPhoneNumber(
                                              estimation?.supplier?.contacts[0].phoneNumber || '',
                                            )}
                                          </div>
                                          ) : <></>
                                      }

                                    </td>
                                  ) : <></>
                                }
                                <td>{estimation.name}</td>
                                <td>
                                  <span
                                    className="fw-bold"
                                  >
                                    {i18n.t('TOURS_OPERATION.ESTIMATION.PRICE')}
                                  </span>
                                  {': '}
                                  <span
                                    className="text-warning"
                                  >
                                    {formatCurrency(estimation.estimatedPrice)}
                                  </span>
                                  <br />
                                  <span
                                    className="fw-bold"
                                  >
                                    {i18n.t('TOURS_OPERATION.ESTIMATION.QUANTITY')}
                                  </span>
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
                                <td>
                                  <span
                                    className="fw-bold"
                                  >
                                    {i18n.t('TOURS_OPERATION.ESTIMATION.PRICE')}
                                  </span>
                                  {': '}
                                  <span
                                    className="text-warning"
                                  >
                                    {formatCurrency(estimation.actualPrice)}
                                  </span>
                                  <br />
                                  <span
                                    className="fw-bold"
                                  >
                                    {i18n.t('TOURS_OPERATION.ESTIMATION.QUANTITY')}
                                  </span>
                                  {': '}
                                  {estimation.actualQuantity}
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
                                            setSelectedEstimation(estimation);
                                            toggleUpdateFormModal();
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
                                        <DropdownItem
                                          tag="a"
                                          href="/"
                                          className="w-100"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedEstimation(estimation);
                                            handleDeleteEstimation();
                                          }}
                                        >
                                          <X size={14} className="me-50" />
                                          <span
                                            className="align-middle"
                                          >
                                            {i18n.t('COMMON.DELETE')}
                                          </span>
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
                                </td>
                              </tr>
                            );
                          });
                        },
                      );
                    })
                  }
                  </tbody>
                </Table>
              )
            }
          </div>
        </CardBody>
      </Card>
      <EstimationCreatePage
        createFormModal={createFormModal}
        toggleCreateFormModal={toggleCreatFormModal}
      />
      <EstimationUpdatePage
        updateFormModal={updateFormData}
        toggleUpdateFormModal={toggleUpdateFormModal}
        updatingEstimation={selectedEstimation!}
      />
    </>
  );
}
