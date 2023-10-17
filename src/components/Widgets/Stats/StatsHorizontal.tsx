import React, { ReactNode } from 'react';
// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import {
  Card, CardBody, Col, Row,
} from 'reactstrap';

export interface StatsHorizontalProps {
  icon?: ReactNode,
  color?: string,
  stats?: string,
  renderStats?: ReactNode,
  statTitle?: string,
  subTitle?: string,
  className?: string,
  statsMargin?: 'mb-0' | 'mb-25' | 'mb-50' | 'mb-75' | 'mb-1' | 'mb-2' | 'mb-3' | 'mb-4' | 'mb-5'
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
    subTitle,
  } = props;
  const bgColor = `bg-light-${color}`;
  return (
    <Card>
      <CardBody className={className}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {renderStats || (
              <h2
                className={classnames('fw-bolder', {
                  'mb-0': !statsMargin,
                  statsMargin,
                })}
              >
                {stats}
              </h2>
            )}

            <p className="card-text">{statTitle}</p>
          </div>
          <div className={`avatar avatar-stats p-50 m-0 ${color ? bgColor : 'bg-light-primary'}`}>
            <div className="avatar-content">{icon}</div>
          </div>
        </div>
      </CardBody>
      {subTitle && (
        <Row>
          <Col lg="12" md="12" sm="12">
            {subTitle}
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default StatsHorizontal;
