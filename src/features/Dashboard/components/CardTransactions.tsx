import React from 'react';
// ** Custom Components
import Avatar, { AvatarColor } from '@components/Avatar/Avatar';

// ** Icons Imports
// import * as Icon from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from 'reactstrap';

export interface CardTransaction {
  title: string,
  color?: AvatarColor,
  subtitle?: string,
  amount?: number | string,
  Icon?: any,
  textColorClass?: string,
}

interface CardTransactionsProps {
  title?: string,
  data: CardTransaction[]
}

const CardTransactions = ({ title, data }: CardTransactionsProps) => {
  const renderTransactions = () => data.map((item) => (
    <div key={item.title} className="transaction-item" style={{ minHeight: '42px' }}>
      <div className="d-flex">
        {item.Icon && (
          <Avatar className="rounded cursor-default-important" color={item.color || 'primary'} icon={<item.Icon size={18} />} />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h6 className="transaction-title">{item.title}</h6>
          {item.subtitle != null && <small>{item.subtitle}</small>}
        </div>
      </div>
      <div className={`fw-bolder ${item.textColorClass ? item.textColorClass : 'text-success'}`}>
        {item.amount}
      </div>
    </div>
  ));

  return (
    <Card className="card-transaction">
      <CardHeader>
        <CardTitle tag="h4">{title}</CardTitle>
        {/* <Icon.MoreVertical size={18} className="cursor-pointer" /> */}
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  );
};

export default CardTransactions;
