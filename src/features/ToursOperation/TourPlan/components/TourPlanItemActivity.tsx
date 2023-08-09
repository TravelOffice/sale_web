import React, { ReactNode, useMemo, useState } from 'react';
import { generateI18nForTourOperation } from '@utils/TousOperationUtils';
import { DailyTourPlanItem, TourPlanActivityType } from '@domain/entities/tour/TourPlan';
import {
  AirplaneTakeOff16Regular, BoardGamesRegular, DataWaterfallRegular,
  DrinkWine16Regular,
  Food16Regular, Location16Regular, MapRegular, PuzzleCube16Regular, Tent16Regular,
  VehicleCar16Regular,
} from '@fluentui/react-icons/lib/fonts';
import { Edit3 } from 'react-feather';
import moment from 'moment';
import classNames from 'classnames';

export interface TourPlanItemActivityProps {
  activity: DailyTourPlanItem,
  onClick: (activity: DailyTourPlanItem) => void,
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
  const { activity, onClick } = props;
  const [showEditButton, setShowEditButton] = useState(false);
  const color = useMemo(() => {
    const now = Date.now();
    if (now < activity.startTime) return 'secondary';
    return activityColors[activity.activityType];
  }, []);
  return (
    <li
      className="timeline-item cursor-pointer"
      onClick={() => onClick(activity)}
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
        <p className="text-sm mb-0">
          <span className="text-dark">
            {activity.description}
          </span>
        </p>
      </div>
    </li>
  );
}
