import React from 'react';
import {
  Card, CardBody, CardHeader,
} from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import { numberArrayOf } from '@utils/ArrayUtils';

export default function MailContentSkeleton() {
  return (
    <>
      {numberArrayOf(3).map((i) => (
        <Card key={i}>
          <CardHeader className="email-detail-head">
            <Skeleton containerClassName="w-100" count={2} />
          </CardHeader>
          <CardBody className="mail-message-wrapper pt-2">
            <Skeleton count={3} />
          </CardBody>
        </Card>
      ))}
    </>
  );
}
