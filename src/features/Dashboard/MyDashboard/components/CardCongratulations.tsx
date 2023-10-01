// ** Icons Imports
import { Award } from 'react-feather';

// ** Custom Components
import Avatar from '@components/Avatar/Avatar';

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap';

// ** Images
import decorationLeft from '@assets/images/elements/decore-left.png';
import decorationRight from '@assets/images/elements/decore-right.png';
import React from 'react';
import { useCurrentUser } from '@hooks/auth';
import i18n from 'i18next';

export interface CardCongratulationsProps {
  month: number;
  completedValue: string;
}

const CardCongratulations = ({ month, completedValue }: CardCongratulationsProps) => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;
  const { firstName, lastName } = currentUser;

  return (
    <Card className="card-congratulations">
      <CardBody className="text-center">
        <img className="congratulations-img-left" src={decorationLeft} alt="decor-left" />
        <img className="congratulations-img-right" src={decorationRight} alt="decor-right" />
        <Avatar icon={<Award size={28} />} className="shadow" color="primary" size="xl" />
        <div className="text-center">
          <h1 className="mb-1 text-white">
            {i18n.t('DASHBOARD.CONGRATULATION', { name: `${lastName} ${firstName}` })}
          </h1>
          <CardText className="m-auto w-75">
            {i18n.t('DASHBOARD.YOU_HAVE_DONE', { completedValue, month })}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardCongratulations;
