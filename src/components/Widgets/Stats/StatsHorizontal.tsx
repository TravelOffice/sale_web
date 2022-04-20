import React, { ReactNode } from 'react';
// ** Third Party Components
import PropTypes from 'prop-types';
import classnames from 'classnames';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

export interface StatsHorizontalProps {
  icon?: ReactNode,
  color?: string,
  stats?: string,
  renderStats?: ReactNode,
  statTitle?: string,
  className?: string,
  statsMargin?: string | number | symbol | any
}

const StatsHorizontal = (props: StatsHorizontalProps) => {
  const {
    icon,
    color,
    stats,
    renderStats,
    statTitle,
    className,
    statsMargin,
  } = props;
  return (
    <Card>
      <CardBody className={className}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {renderStats || (
              <h2
                className={classnames('fw-bolder', {
                  'mb-0': !statsMargin,
                  [statsMargin]: statsMargin,
                })}
              >
                {stats}
              </h2>
            )}

            <p className="card-text">{statTitle}</p>
          </div>
          <div className={`avatar avatar-stats p-50 m-0 ${color ? `bg-light-${color}` : 'bg-light-primary'}`}>
            <div className="avatar-content">{icon}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsHorizontal;
