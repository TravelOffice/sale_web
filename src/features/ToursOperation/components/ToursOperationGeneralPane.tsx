import React, { useMemo } from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import i18n from 'i18next';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { tourPresenter } from '@adapter/presenters';
import { ToursOperationDetailParams } from '@features/ToursOperation/ToursOperationDetail';
import { findTourLocationNameByCode } from '@utils/TourLocationUtils';
import { formatVND } from '@utils/CommonUtils';
import { useEstimations } from '@hooks/tourDeparture';
import { useSupplier } from '@hooks/supplier';
import { Estimation } from '@domain/entities/tour/Estimation';
import { groupBy } from '@utils/Utils';
import { generateI18nForSupplier } from '@utils/SupplierUtils';

export default function ToursOperationGeneralPane() {
  const { tourId } = useParams<ToursOperationDetailParams>();
  const relatedData = useQueries({
    queries: [
      {
        queryKey: ['departureTour'],
        queryFn: async () => tourPresenter.getDepartureTour(tourId),
      },
      {
        queryKey: ['toursLocation'],
        queryFn: tourPresenter.getAllToursLocation,
      },
    ],
  });

  // Extracting data from related data
  const [
    departureTourRs,
    tourLocationsRs,
  ] = relatedData;

  const { data: departureTour } = departureTourRs;
  const { data: tourLocations } = tourLocationsRs;

  const {
    data: allEstimations,
  } = useEstimations(tourId);

  const {
    data: allSuppliers,
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

  const totalEstExpenditureBeforeVAT = useMemo(() => estimationsWithSupplier.reduce(
    (total, est) => total + est.estimatedPrice * est.estimatedQuantity, 0,
  ), [estimationsWithSupplier]);

  const totalEstExpenditureAfterVAT = useMemo(() => estimationsWithSupplier.reduce(
    (total, est) => total + est.estimatedPrice * est.estimatedQuantity * (1 + est.vat / 100), 0,
  ), [estimationsWithSupplier]);

  const totalActualExpenditureBeforeVAT = useMemo(() => estimationsWithSupplier.reduce(
    (total, est) => total + est.actualPrice * est.actualQuantity, 0,
  ), [estimationsWithSupplier]);

  const totalActualExpenditureAfterVAT = useMemo(() => estimationsWithSupplier.reduce(
    (total, est) => total + est.actualPrice * est.actualQuantity * (1 + est.vat / 100), 0,
  ), [estimationsWithSupplier]);

  const totalActualExpenditureOfTourGuide = useMemo(() => estimationsWithSupplier.reduce(
    (total, est) => (est.payer === 'TOUR_GUIDE' ? total + est.actualPrice * est.actualQuantity * (1 + est.vat / 100) : total), 0,
  ), [estimationsWithSupplier]);

  return (
    <Row>
      <Col md={6}>
        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('TOURS_OPERATION.TOUR_INFORMATION')}</CardTitle>
          </CardHeader>
          <CardBody>
            {departureTour && (
              <table className="table">
                <tbody className="table-hover table-striped">
                  <tr>
                    <td>{i18n.t('DEPARTURE_TOUR.NAME')}</td>
                    <td>{departureTour.name}</td>
                  </tr>
                  <tr>
                    <td>{i18n.t('DEPARTURE_TOUR.TOUR_CATEGORY')}</td>
                    <td>{departureTour.type}</td>
                  </tr>
                  <tr>
                    <td>{i18n.t('TOURS_OPERATION.CREATED_BY')}</td>
                    <td>{departureTour.creatorName}</td>
                  </tr>
                  <tr>
                    <td>{i18n.t('TOURS_OPERATION.TOUR_OPERATED_BY')}</td>
                    <td>{departureTour.assigneeName}</td>
                  </tr>
                  <tr>
                    <td>{i18n.t('TOURS_OPERATION.CREATED_AT')}</td>
                    <td>{moment(departureTour.createdAt).format('DD/MM/YYYY')}</td>
                  </tr>
                  <tr>
                    <td>{i18n.t('TOURS_OPERATION.STARTING_LOCATION')}</td>
                    <td>
                      {departureTour && findTourLocationNameByCode(
                        tourLocations || [],
                        departureTour.startingLocation,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>{i18n.t('TOURS_OPERATION.ENDING_LOCATION')}</td>
                    <td>
                      {departureTour && findTourLocationNameByCode(
                        tourLocations || [],
                        departureTour.endingLocation,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>{i18n.t('DEPARTURE_TOUR.VISITOR_COUNT')}</td>
                    <td>
                      {departureTour.visitorCount}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('TOURS_OPERATION.SUMMARY_OF_SERVICES')}</CardTitle>
          </CardHeader>
          <CardBody className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>{i18n.t('TOURS_OPERATION.SERVICES')}</th>
                  <th>{i18n.t('TOURS_OPERATION.BEFORE_VAT')}</th>
                  <th>{i18n.t('TOURS_OPERATION.AFTER_VAT')}</th>
                </tr>
              </thead>
              <tbody className="table-hover table-striped">
                {Object.keys(estimationsGroupByType).map((serviceType) => {
                  const serviceSummary = estimationsGroupByType[serviceType].map(
                    (item: Estimation) => {
                      const { estimatedPrice, estimatedQuantity, vat } = item;
                      return {
                        beforeVAT: estimatedQuantity * estimatedPrice,
                        afterVAT: estimatedQuantity * estimatedPrice * (1 + vat / 100),
                      };
                    },
                  );
                  return (
                    <tr key={serviceType}>
                      <td>{generateI18nForSupplier(serviceType)}</td>
                      <td>
                        {formatVND(serviceSummary.reduce(
                          (total, item) => total + item.beforeVAT, 0,
                        ))}
                      </td>
                      <td>
                        {formatVND(serviceSummary.reduce(
                          (total, item) => total + item.afterVAT, 0,
                        ))}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.TOTAL_EXPENDITURE')}</td>
                  <td>
                    {formatVND(totalEstExpenditureBeforeVAT)}
                  </td>
                  <td>
                    {formatVND(totalEstExpenditureAfterVAT)}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('TOURS_OPERATION.REVENUE_SUMMARY')}</CardTitle>
          </CardHeader>
          <CardBody className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>{i18n.t('TOURS_OPERATION.TOTAL_REVENUE')}</th>
                  <th>{i18n.t('TOURS_OPERATION.TOTAL_AMOUNT_PAID')}</th>
                  <th>{i18n.t('TOURS_OPERATION.GUIDE_FEE_AMOUNT_COLLECTED')}</th>
                </tr>
              </thead>
              <tbody className="table-hover table-striped">
                <tr>
                  {/* TODO: Replace '0' with actual expenditure value */}
                  <td>{formatVND(0)}</td>
                  <td>{formatVND(0)}</td>
                  <td>{formatVND(0)}</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('TOURS_OPERATION.TOUR_COST_SUMMARY')}</CardTitle>
          </CardHeader>
          <CardBody className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{i18n.t('TOURS_OPERATION.BEFORE_VAT')}</th>
                  <th>{i18n.t('TOURS_OPERATION.AFTER_VAT')}</th>
                </tr>
              </thead>
              <tbody className="table-hover table-striped">
                <tr>
                  <td colSpan={3}><b>{i18n.t('TOURS_OPERATION.REVENUE')}</b></td>
                </tr>
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.TOTAL_REVENUE')}</td>
                  {/* TODO: Replace '0' with actual expenditure value */}
                  <td>{formatVND(0)}</td>
                  <td>{formatVND(0)}</td>
                </tr>
                <tr>
                  <td colSpan={3}><b>{i18n.t('TOURS_OPERATION.TOUR_ESTIMATION')}</b></td>
                </tr>
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.TOTAL_EXPENDITURE')}</td>
                  <td>{formatVND(totalEstExpenditureBeforeVAT)}</td>
                  <td>{formatVND(totalEstExpenditureAfterVAT)}</td>
                </tr>
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.EXPECTED_PROFIT')}</td>
                  {/* TODO: Replace '0' with actual expenditure value */}
                  <td>{formatVND(0)}</td>
                  <td>{formatVND(0)}</td>
                </tr>
                <tr>
                  <td colSpan={3}><b>{i18n.t('TOURS_OPERATION.SUMMARY')}</b></td>
                </tr>
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.TOTAL_EXPENDITURE')}</td>
                  {/* TODO: Replace '0' with actual expenditure value */}
                  <td>{formatVND(totalActualExpenditureBeforeVAT)}</td>
                  <td>{formatVND(totalActualExpenditureAfterVAT)}</td>
                </tr>
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.EXPECTED_PROFIT')}</td>
                  {/* TODO: Replace '0' with actual expenditure value */}
                  <td>{formatVND(0)}</td>
                  <td>{formatVND(0)}</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{i18n.t('TOURS_OPERATION.TOUR_GUIDE_REVENUE_EXPENDITURE')}</CardTitle>
          </CardHeader>
          <CardBody className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{i18n.t('TOURS_OPERATION.TOTAL_MONEY')}</th>
                </tr>
              </thead>
              <tbody className="table-hover table-striped">
                <tr>
                  <td colSpan={3}><b>{i18n.t('TOURS_OPERATION.REVENUE_ITEM')}</b></td>
                </tr>
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.AMOUNT_COLLECTED_BY_THE_TOUR_GUIDE_DURING_THE_TOUR')}</td>
                  <td>{formatVND(totalActualExpenditureOfTourGuide)}</td>
                </tr>
                <tr>
                  <td colSpan={3}><b>{i18n.t('TOURS_OPERATION.EXPENDITURE_ITEM')}</b></td>
                </tr>
                <tr>
                  <td>{i18n.t('TOURS_OPERATION.AMOUNT_SPENT_BY_THE_TOUR_GUIDE_DURING_THE_TOUR')}</td>
                  {/* TODO: Replace '0' with actual expenditure value */}
                  <td>{formatVND(0)}</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
