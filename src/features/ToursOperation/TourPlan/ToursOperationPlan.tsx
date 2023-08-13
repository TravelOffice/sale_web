import React, { useCallback, useMemo, useState } from 'react';
import {
  Button, Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import TourOperationPlanItem from '@features/ToursOperation/TourPlan/components/TourOperationPlanItem';
import { useParams } from 'react-router-dom';
import { useDepartureTour, useEstimations, useTourPlan } from '@hooks/tourDeparture';
import { DailyKey, DailyTourPlanItem } from '@domain/entities/tour/TourPlan';
import { convertTourPlanDayToMoment, generateI18nForDailyTourPlanKey } from '@utils/TousOperationUtils';
import i18n from '@config/i18n';
import CreateTourPlanActivityModal from '@features/ToursOperation/TourPlan/CreateTourPlanActivityModal';
import EditTourPlanActivityModal from '@features/ToursOperation/TourPlan/EditTourPlanActivityModal';
import DeleteTourPlanActivityModal from '@features/ToursOperation/TourPlan/DeleteTourPlanActivityModal';
import { useSupplier } from '@hooks/supplier';
import { Estimation } from '@domain/entities/tour/Estimation';
import EstimationCreatePage from '@features/ToursOperation/Estimation/EstimationCreatePage';
import EstimationUpdatePage from '@features/ToursOperation/Estimation/EstimationUpdatePage';
import EstimationConfirmDeleteModal from '@features/ToursOperation/Estimation/EstimationConfirmDeleleteModal';

export default function ToursOperationPlan() {
  const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
  const [showEditActivityModal, setShowEditActivityModal] = useState(false);
  const [showDeleteActivityModal, setShowDeleteActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<{
    activity: DailyTourPlanItem, day: DailyKey
  }>();

  const { tourId } = useParams<{ tourId: string }>();
  const { data: tourPlan } = useTourPlan(tourId);
  const { data: tour } = useDepartureTour(tourId);
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

  const tourPlanItems = useMemo(() => {
    if (!tourPlan || !estimationsWithSupplier) return [];
    return Object.entries(tourPlan).map(([key, value]) => ({
      id: key as DailyKey,
      title: generateI18nForDailyTourPlanKey(key as DailyKey),
      data: (value.map((item: DailyTourPlanItem) => ({
        ...item,
        estimations: estimationsWithSupplier.filter(
          (est) => item.estimationId && item.estimationId.includes(est.code),
        ),
      }))) as DailyTourPlanItem[],
    })).sort((a, b) => a.id.localeCompare(b.id));
  }, [tourPlan, estimationsWithSupplier]);

  const onEditActivity = useCallback((day: DailyKey, activity: DailyTourPlanItem) => {
    setSelectedActivity({
      day,
      activity,
    });
    setShowEditActivityModal(true);
  }, []);

  const onActivityDeleted = useCallback(() => {
    setShowDeleteActivityModal(false);
    setSelectedActivity(undefined);
    setShowEditActivityModal(false);
  }, []);

  const [openUpdateEstimationModal, setOpenUpdateEstimationModal] = useState(false);
  const [selectedEstimation, setSelectedEstimation] = useState<Estimation | undefined>(undefined);
  const [openCreateEstimationFormModal, setOpenCreateEstimationFormModal] = useState(false);
  const [openConfirmDeleteEstimationModal, setOpenConfirmDeleteEstimationModal] = useState(false);

  const onDeleteEstimation = useCallback((
    day: DailyKey,
    activity: DailyTourPlanItem,
    estimation: Estimation,
  ) => {
    setSelectedActivity({
      day,
      activity,
    });
    setSelectedEstimation(estimation);
    setOpenConfirmDeleteEstimationModal(true);
  }, []);

  const onCreateEstimation = useCallback((day: DailyKey, activity: DailyTourPlanItem) => {
    setSelectedActivity({
      day,
      activity,
    });
    setOpenCreateEstimationFormModal(true);
  }, []);
  const onUpdateEstimation = useCallback((estimation: Estimation) => {
    setSelectedEstimation(estimation);
    setOpenUpdateEstimationModal(true);
  }, []);

  const toggleCreateEstimationFormModal = () => {
    setOpenCreateEstimationFormModal(!openCreateEstimationFormModal);
  };

  const toggleUpdateEstimationFormModal = () => {
    setOpenUpdateEstimationModal(!openUpdateEstimationModal);
  };

  const toggleConfirmDeleteEstimationModal = () => {
    setOpenConfirmDeleteEstimationModal(!openConfirmDeleteEstimationModal);
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">{i18n.t('TOURS_OPERATION.TOUR_PLAN')}</CardTitle>
            </CardHeader>
            <CardBody>
              {tour && tourPlan ? (
                <>
                  <ul className="timeline">
                    {
                      tourPlanItems.map((tourPlanItem) => (
                        <TourOperationPlanItem
                          key={tourPlanItem.id}
                          title={tourPlanItem.title}
                          activities={tourPlanItem.data}
                          date={convertTourPlanDayToMoment(tour, tourPlanItem.id).format('DD/MM/YYYY')}
                          onEditActivity={(activity) => onEditActivity(
                            tourPlanItem.id as DailyKey,
                            activity,
                          )}
                          onCreateEstimation={(activity) => onCreateEstimation(
                            tourPlanItem.id as DailyKey,
                            activity,
                          )}
                          onUpdateEstimation={(estimation) => onUpdateEstimation(estimation)}
                          onDeleteEstimation={(activity, estimation) => onDeleteEstimation(
                            tourPlanItem.id as DailyKey,
                            activity,
                            estimation,
                          )}
                        />
                      ))
                    }
                  </ul>
                </>
              ) : (
                <>
                  {i18n.t('TOURS_OPERATION.TOUR_PLAN_KEY.NO_ACTIVITY_TO_DISPLAY')}
                  <br />
                </>
              )}
              <Button className="mt-2" color="primary" onClick={() => setShowCreateActivityModal(true)}>{i18n.t('TOURS_OPERATION.ADD_ACTIVITY')}</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {
        tour && (
          <CreateTourPlanActivityModal
            tourPlan={tourPlan ?? {}}
            tourId={tourId}
            tour={tour}
            isOpen={showCreateActivityModal}
            toggle={() => setShowCreateActivityModal(!showCreateActivityModal)}
            className="modal-dialog-centered"
          />
        )
      }
      {
        tour && tourPlan && (
          <EditTourPlanActivityModal
            className="modal-dialog-centered"
            tourPlan={tourPlan}
            tourId={tourId}
            tour={tour}
            day={selectedActivity?.day}
            isOpen={showEditActivityModal}
            selectedActivity={selectedActivity?.activity}
            toggle={() => setShowEditActivityModal(!showEditActivityModal)}
            onClosed={() => setSelectedActivity(undefined)}
            onDeleteClicked={() => setShowDeleteActivityModal(true)}
          />
        )
      }
      {
        tour && tourPlan && selectedActivity && (
          <DeleteTourPlanActivityModal
            className="modal-dialog-centered"
            isOpen={showDeleteActivityModal}
            toggle={() => setShowDeleteActivityModal(!showDeleteActivityModal)}
            tourId={tourId}
            tourPlan={tourPlan}
            day={selectedActivity.day}
            activityId={selectedActivity.activity.id}
            onActivityDeleted={onActivityDeleted}
          />
        )
      }
      {
        tour && tourPlan && selectedActivity && (
        <EstimationCreatePage
          allSuppliers={allSuppliers!}
          createFormModal={openCreateEstimationFormModal}
          toggleCreateFormModal={toggleCreateEstimationFormModal}
          currentTourPlan={tourPlan}
          tourPlanDay={selectedActivity.day}
          activityId={selectedActivity.activity.id}
        />
        )
      }
      {
        selectedEstimation && (
        <EstimationUpdatePage
          updateFormModal={openUpdateEstimationModal}
          toggleUpdateFormModal={toggleUpdateEstimationFormModal}
          updatingEstimation={selectedEstimation}
        />
        )
      }
      {
        selectedEstimation && selectedActivity && (
        <EstimationConfirmDeleteModal
          selectedEstimation={selectedEstimation}
          toggleConfirmDeleteEstimationModal={toggleConfirmDeleteEstimationModal}
          openConfirmDeleteEstimationModal={openConfirmDeleteEstimationModal}
          tourPlanDay={selectedActivity.day}
          activityId={selectedActivity.activity.id}
          currentTourPlan={tourPlan}
        />
        )
      }
    </>
  );
}
