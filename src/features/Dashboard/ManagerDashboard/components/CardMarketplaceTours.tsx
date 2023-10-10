// ** React Imports
import React, { Fragment, useMemo } from 'react';

// ** Third Party Components
// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle, UncontrolledTooltip,
} from 'reactstrap';
import i18n from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { MetricNameEnum, TourFillingRatio } from '@domain/entities/statistic/TravelStatistic';
import { tourTemplatePresenter, travelStatisticPresenter } from '@adapter/presenters';
import Table from '@components/Table/Table';
import { TableColumn } from 'react-data-table-component';
import { HandleDataState } from '@redux/slices/others/HandleDataState';
import { TOUR_TEMPLATE_INDEX } from '@utils/Constants';
import generateMarketplacePostUrl from '@utils/MarketplaceUtils';
import { getMarketplacePage } from '@utils/EnvUtils';
import { ArrowUpRight, Share2 } from 'react-feather';
import { Link } from 'react-router-dom';

export const fillingRatioTourColumns: TableColumn<TourFillingRatio>[] = [
  {
    name: i18n.t('DEPARTURE_TOUR.CODE'),
    width: '130px',
    sortable: true,
    sortField: 'departureTourId',
    cell: (tour: TourFillingRatio) => (
      <Link to={`/apps/tours/departure/${tour.departureTourId}/edit`} className="text-truncate text-body text-center">
        <span className="fw-bolder">{tour.departureTourId}</span>
        <ArrowUpRight size={16} />
      </Link>
    ),
  },
  {
    name: i18n.t('DEPARTURE_TOUR.NAME'),
    minWidth: '220px',
    sortable: true,
    sortField: 'departureTourName',
    cell: (tour: TourFillingRatio) => (
      <Link to={`/apps/tours/departure/${tour.departureTourId}/edit`} className="text-truncate text-body text-center">
        <span className="fw-bolder">{tour.departureTourName}</span>
        <ArrowUpRight size={16} />
      </Link>
    ),
  },
  {
    name: i18n.t('DEPARTURE_TOUR.FILLING_RATIO'),
    minWidth: '220px',
    sortable: true,
    sortField: 'fillingRatio',
    cell: (tour: TourFillingRatio) => `${tour.fillingRatio}%`,
  },
  {
    name: i18n.t('COMMON.MARKETPLACE'),
    minWidth: '150px',
    cell: (tour: TourFillingRatio) => {
      // The text `#` is not allowed in the URL, so we need to replace it with `%23`
      const tourTemplateId = `${TOUR_TEMPLATE_INDEX}%23${tour.departureTourId}`;
      const { data: linkedPostOnMarketplace } = useQuery({
        queryKey: ['linkedPostOnMarketplace', tourTemplateId],
        queryFn: () => tourTemplatePresenter.getLinkedPostOnMarketplaceInfo(tourTemplateId),
      });
      const isMarketplaceAvailable = linkedPostOnMarketplace?.isAvailable;
      const totalOffers = linkedPostOnMarketplace?.totalOffers || 0;
      const openUrl = () => {
        if (isMarketplaceAvailable) {
          window.open(generateMarketplacePostUrl());
        } else {
          window.open(getMarketplacePage());
        }
      };

      return (
        <div>
          <Button
            outline
            id={`tour-template-marketplace-info-${tour.departureTourId}`}
            color={isMarketplaceAvailable ? 'primary' : 'secondary'}
            size="sm"
            onClick={openUrl}
          >
            <Share2 size={12} />
          </Button>
          <UncontrolledTooltip
            placement="top"
            target={`tour-template-marketplace-info-${tour.departureTourId}`}
          >
            {
              isMarketplaceAvailable
                ? i18n.t('MARKETPLACE.MARKETPLACE_INFO_TOOLTIP', {
                  totalOffers,
                  modelName: i18n.t('COMMON.TOUR_TEMPLATE'),
                }) : i18n.t('MARKETPLACE.MARKETPLACE_INFO_NOT_AVAILABLE', { modelName: i18n.t('COMMON.TOUR_TEMPLATE') })
            }
          </UncontrolledTooltip>
        </div>
      );
    },
  },
];

const CardMarketplaceTours = () => {
  const {
    data: topProficiencyTours,
    refetch,
    isFetching, isFetched, isError,
  } = useQuery(
    [MetricNameEnum.TOUR_FILLING_RATIO],
    async () => travelStatisticPresenter.getTravelStatistic(
      MetricNameEnum.TOUR_FILLING_RATIO,
    ),
  );

  const fetchDataState: HandleDataState = useMemo(() => {
    if (isFetching) return 'loading';
    if (isFetched) return 'finished';
    if (isError) return 'error';
    return 'init';
  }, [isFetching, isFetched, isError]);

  return (
    <>
      <Card>
        <CardHeader className="align-items-end">
          <CardTitle tag="h4">{i18n.t('DASHBOARD.LIST_OF_TOURS_CAN_BE_SOLD_ON_TRAVEL_CONNECT')}</CardTitle>
        </CardHeader>
        <CardBody>
          <Table<TourFillingRatio>
            selectableRows={false}
            columns={fillingRatioTourColumns}
            fetchDataState={fetchDataState}
            searchableColumns={['departureTourId', 'departureTourName', 'fillingRatio']}
            sortColumnDefault="departureTourId"
            onPageChange={() => { }}
            onRefresh={refetch}
            data={(topProficiencyTours as TourFillingRatio[]) || []}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default CardMarketplaceTours;
