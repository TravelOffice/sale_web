import React, { ReactNode, useMemo, useState } from 'react';
import { generateI18nForTourOperation } from '@utils/TousOperationUtils';
import { DailyTourPlanItem, TourPlanActivityType } from '@domain/entities/tour/TourPlan';
import {
  AirplaneTakeOff16Regular,
  BoardGamesRegular,
  DataWaterfallRegular,
  DrinkWine16Regular,
  Food16Regular,
  Location16Regular,
  MapRegular,
  PuzzleCube16Regular,
  Tent16Regular,
  VehicleCar16Regular,
} from '@fluentui/react-icons/lib/fonts';
import {
  Edit, Edit3, MoreVertical, X,
} from 'react-feather';
import moment from 'moment';
import classNames from 'classnames';
import i18n from '@config/i18n';
import { generateEditableUrlForSupplier } from '@utils/SupplierUtils';
import { Link, useParams } from 'react-router-dom';
import { formatCurrency } from '@utils/Utils';
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown,
} from 'reactstrap';
import { Estimation } from '@domain/entities/tour/Estimation';
import { useEstimations } from '@hooks/tourDeparture';
import { useSupplier } from '@hooks/supplier';

export interface TourPlanItemActivityProps {
  activity: DailyTourPlanItem,
  onClick: (activity: DailyTourPlanItem) => void,
  onCreateEstimation: (activity: DailyTourPlanItem) => void,
  onUpdateEstimation: (estimation: Estimation) => void,
  onDeleteEstimation: (activity: DailyTourPlanItem, estimation: Estimation) => void,
}

const activityIcons: Record<TourPlanActivityType, ReactNode> = {
  MEAL: <Food16Regular />,
  PARTY: <DrinkWine16Regular />,
  LOCAL_MOVE: <VehicleCar16Regular />,
  FLIGHT_MOVE: <AirplaneTakeOff16Regular />,
  LEISURE: <BoardGamesRegular />,
  KAYAKING: <DataWaterfallRegular />,
  ADVENTURE: <Tent16Regular />,
  DIVING: <DataWaterfallRegular />,
  TREKKING: <MapRegular />,
  CHECKIN: <Location16Regular />,
  CHECKOUT: <Location16Regular />,
  OTHER: <PuzzleCube16Regular />,
};

const activityColors: Record<TourPlanActivityType, string> = {
  MEAL: 'danger',
  PARTY: 'warning',
  LOCAL_MOVE: 'primary',
  FLIGHT_MOVE: 'primary',
  LEISURE: 'success',
  KAYAKING: 'warning',
  ADVENTURE: 'success',
  DIVING: 'info',
  TREKKING: 'success',
  CHECKIN: 'warning',
  CHECKOUT: 'warning',
  OTHER: 'info',
};

export default function TourPlanItemActivity(props: TourPlanItemActivityProps) {
  const { tourId } = useParams<{ tourId: string }>();
  const {
    activity,
    onClick,
    onCreateEstimation,
    onDeleteEstimation,
    onUpdateEstimation,
  } = props;
  const [showEditButton, setShowEditButton] = useState(false);
  const color = useMemo(() => {
    const now = Date.now();
    if (now < activity.startTime) return 'secondary';
    return activityColors[activity.activityType];
  }, []);

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

  const activityWithEstimation = useMemo(() => ({
    ...activity,
    estimations: estimationsWithSupplier.filter(
      (est) => activity.estimationId && activity.estimationId.includes(est.code),
    ),
  }), [activity, estimationsWithSupplier]);

  return (
    <li
      className="timeline-item cursor-pointer"
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
    >
      <span className={classNames('timeline-point', `timeline-point-${color}`)}>
        {activityIcons[activity.activityType]}
      </span>
      <div className="timeline-event">
        <div className="timeline-event-header d-flex justify-content-between mb-1">
          <h6 className="mb-0 fw-bolder">
            {generateI18nForTourOperation(activity.activityType)}
            {' '}
            {showEditButton && (
              <Edit3 className="cursor-pointer" size={14} />
            )}
          </h6>
          <span className="timeline-event-time">
            {moment(activity.startTime).format('HH:mm')}
            {' '}
            -
            {' '}
            {moment(activity.endTime).format('HH:mm')}
          </span>
        </div>
        <Row>
          <Col md={6}>
            <b>
              {i18n.t('TOURS_OPERATION.TOUR_PLAN_KEY.ACTIVITY_DESCRIPTION')}
              :
              {' '}
            </b>
            <span className="text-dark">
              {activity.description}
            </span>
          </Col>
        </Row>
        <Button className="mb-1 mt-1" color="primary" outline size="sm" onClick={() => onClick(activity)}>
          {i18n.t('TOURS_OPERATION.TOUR_PLAN_KEY.UPDATE_ACTIVITY')}
        </Button>
        {' '}
        <Button
          className="mb-1 mt-1"
          color="primary"
          size="sm"
          id={`estimationOfActivity${activity.id}Toggler`}
          outline
        >
          {i18n.t('TOURS_OPERATION.TOUR_PLAN_KEY.SHOW_HIDE_SERVICES')}
        </Button>
        {' '}
        <Button className="mb-1 mt-1" color="primary" outline size="sm" onClick={() => onCreateEstimation(activity)}>
          {i18n.t('TOURS_OPERATION.TOUR_PLAN_KEY.ADD_SERVICE')}
        </Button>
        <>
          <UncontrolledCollapse defaultOpen toggler={`#estimationOfActivity${activity.id}Toggler`}>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th style={{ minWidth: 100 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SERVICE_TYPE')}</th>
                  <th style={{ minWidth: 250 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.SUPPLIER')}</th>
                  <th style={{ minWidth: 250 }}>{i18n.t('COMMON.DETAILS')}</th>
                  <th style={{ minWidth: 100 }}>{i18n.t('TOURS_OPERATION.ESTIMATION.TEMPORARY_CALCULATED')}</th>
                  <th style={{ minWidth: 100 }}>{i18n.t('COMMON.ACTIONS')}</th>
                </tr>
              </thead>
              <tbody className="table-hover table-striped">
                {activityWithEstimation.estimations.length > 0
                  ? activityWithEstimation.estimations.map((estimation) => (
                    <tr>
                      <td>{generateI18nForTourOperation(`ESTIMATION.${estimation.serviceType}`)}</td>
                      <td>
                        <Link
                          to={generateEditableUrlForSupplier(estimation.supplierId)}
                          className="text-truncate text-body text-center"
                        >
                          <span
                            className="fw-bolder text-primary"
                          >
                            {estimation.supplier?.name}
                          </span>
                        </Link>
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
                        <span className="fst-italic">
                          (
                          {
                              generateI18nForTourOperation(`ESTIMATION.${estimation.vatStatus}`)
                            }
                          )
                        </span>
                      </td>
                      <td>
                        {formatCurrency(
                          estimation.estimatedQuantity * estimation.estimatedPrice,
                        )}
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
                                  onUpdateEstimation(estimation);
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
                                  onDeleteEstimation(activity, estimation);
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
                  )) : (
                    <tr>
                      <td colSpan={5}>{i18n.t('TOURS_OPERATION.TOUR_PLAN_KEY.NO_ESTIMATION_TO_DISPLAY')}</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </UncontrolledCollapse>
        </>
      </div>
    </li>
  );
}
