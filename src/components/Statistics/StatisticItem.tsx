import React, { ReactNode } from 'react';
import { CardText, Col, ColProps } from 'reactstrap';
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';

export interface StatisticItemProps extends ColProps {
  color: AvatarColor,
  icon: ReactNode,
  title: string,
  subtitle: string,
}

export default function StatisticItem(props: StatisticItemProps) {
  const {
    color, icon, title, subtitle, ...rest
  } = props;
  return (
    <Col {...rest}>
      <div className="d-flex align-items-center">
        <Avatar color={color} icon={icon} className="me-2" />
        <div className="my-auto">
          <h4 className="fw-bolder mb-0">{title}</h4>
          <CardText className="font-small-3 mb-0">{subtitle}</CardText>
        </div>
      </div>
    </Col>
  );
}
