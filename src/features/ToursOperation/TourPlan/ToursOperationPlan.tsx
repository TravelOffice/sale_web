import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import TourOperationPlanItem from '@features/ToursOperation/TourPlan/components/TourOperationPlanItem';
import { useParams } from 'react-router-dom';
import { useDepartureTour, useTourPlan } from '@hooks/tourDeparture';
import { DailyKey, DailyTourPlanItem } from '@domain/entities/tour/TourPlan';
import { convertTourPlanDayToMoment, generateI18nForDailyTourPlanKey } from '@utils/TousOperationUtils';
import i18n from '@config/i18n';
import CreateTourPlanActivityModal from '@features/ToursOperation/TourPlan/CreateTourPlanActivityModal';
import EditTourPlanActivityModal from '@features/ToursOperation/TourPlan/EditTourPlanActivityModal';
import DeleteTourPlanActivityModal from '@features/ToursOperation/TourPlan/DeleteTourPlanActivityModal';

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
  const tourPlanItems = useMemo(() => {
    if (!tourPlan) return [];
    return Object.entries(tourPlan).map(([key, value]) => ({
      id: key as DailyKey,
      title: generateI18nForDailyTourPlanKey(key as DailyKey),
      data: value as DailyTourPlanItem[],
    })).sort((a, b) => a.id.localeCompare(b.id));
  }, [tourPlan]);

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

  if (!tour || !tourPlan) {
    return <></>;
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">{i18n.t('TOURS_OPERATION.TOUR_PLAN')}</CardTitle>
            </CardHeader>
            <CardBody>
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
                    />
                  ))
                }
              </ul>
              <Button className="mt-2" color="primary" onClick={() => setShowCreateActivityModal(true)}>{i18n.t('TOURS_OPERATION.ADD_ACTIVITY')}</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {
        tourPlan && tour && (
          <CreateTourPlanActivityModal
            tourPlan={tourPlan}
            tourId={tourId}
            tour={tour}
            isOpen={showCreateActivityModal}
            toggle={() => setShowCreateActivityModal(!showCreateActivityModal)}
            className="modal-dialog-centered"
          />
        )
      }
      {
        tourPlan && (
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
    </>
  );
}
