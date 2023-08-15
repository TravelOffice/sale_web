import React, { useMemo } from 'react';
import { DailyTourPlanItem } from '@domain/entities/tour/TourPlan';
import TourPlanItemActivity from '@features/ToursOperation/TourPlan/components/TourPlanItemActivity';
import moment from 'moment';
import classNames from 'classnames';
import { Estimation } from '@domain/entities/tour/Estimation';

export interface TourOperationPlanItemProps {
  title: string,
  date: string,
  activities: DailyTourPlanItem[],
  onEditActivity: (activity: DailyTourPlanItem) => void,
  onDeleteEstimation: (activity: DailyTourPlanItem, estimation: Estimation) => void,
  onCreateEstimation: (activity: DailyTourPlanItem) => void,
  onUpdateEstimation: (estimation: Estimation) => void,
}

export default function TourOperationPlanItem(props: TourOperationPlanItemProps) {
  const {
    title,
    date,
    activities,
    onEditActivity,
    onCreateEstimation,
    onUpdateEstimation,
    onDeleteEstimation,
  } = props;
  const color = useMemo(() => {
    if (moment(date, 'DD/MM/YYYY').toDate().getTime() > Date.now()) return 'secondary';
    return 'primary';
  }, [date]);
  return (
    <>
      <li className="timeline-item pb-0">
        <span className={classNames('timeline-point timeline-point-indicator', `timeline-point-${color}`)} />
        <div className="timeline-event" style={{ minHeight: '3rem' }}>
          <div className="d-flex justify-content-between mb-1">
            <h6 className="mb-0 fw-bolder fs-5">{title.toUpperCase()}</h6>
            <span className="timeline-event-time">
              {date}
            </span>
          </div>
        </div>
      </li>
      {
        activities.map((activity) => (
          <TourPlanItemActivity
            activity={activity}
            key={activity.activityType}
            onClick={onEditActivity}
            onCreateEstimation={onCreateEstimation}
            onUpdateEstimation={onUpdateEstimation}
            onDeleteEstimation={onDeleteEstimation}
          />
        ))
      }
    </>
  );
}
