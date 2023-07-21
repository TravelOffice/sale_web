import { numberArrayOf } from '@utils/ArrayUtils';
import { Col, Row } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import React from 'react';

export default function renderSkeleton() {
  return (
    <>
      {
        numberArrayOf(10).map((key) => (
          <Row className="mb-1" key={key}>
            <Col sm="3">
              <Skeleton height={36} />
            </Col>
            <Col sm="9">
              <Skeleton height={36} />
            </Col>
          </Row>
        ))
      }
    </>
  );
}
