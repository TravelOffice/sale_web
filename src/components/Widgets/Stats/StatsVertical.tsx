// ** Third Party Components
import React, { ReactNode } from 'react';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

export interface StatsVerticalProps {
  icon?: ReactNode,
  color?: string,
  stats?: ReactNode,
  statTitle?: string,
  className?: string
}

const StatsVertical = (props: StatsVerticalProps) => {
  const {
    icon, color, stats, statTitle, className,
  } = props;
  const bgColor = `bg-light-${color}`;
  return (
    <Card className="text-center">
      <CardBody className={className}>
        <div className={`avatar p-50 m-0 mb-1 ${color ? bgColor : 'bg-light-primary'}`}>
          <div className="avatar-content">{icon}</div>
        </div>
        <h2 className="fw-bolder">{stats}</h2>
        <p className="card-text line-ellipsis">{statTitle}</p>
      </CardBody>
    </Card>
  );
};

export default StatsVertical;
