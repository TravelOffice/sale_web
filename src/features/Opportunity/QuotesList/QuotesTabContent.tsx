import React, { useState } from 'react';
import {
  Card,
  CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import i18n from '@config/i18n';
import Timeline, { TimelineData } from '@components/Timeine/Timeline';
import Images from '@themes/Images';
import { Quote } from '@domain/entities/quote/Quote';

const pdf = Images.pdfFileIcon;

const testData = [
  {
    title: 'Title',
    description: 'quote.description',
    status: 'INITIALIZED',
    children: 1,
    adults: 10,
  },
  {
    title: 'Title',
    description: 'quote.description',
    status: 'INITIALIZED',
    children: 1,
    adults: 10,
  },
  {
    title: 'Title',
    description: 'quote.description',
    status: 'INITIALIZED',
    children: 1,
    adults: 10,
  },
] as Array<Quote>;

const QuotesTabContent = () => {
  const [quotes, setQuotes] = useState<Array<Quote>>(testData);
  console.log(quotes, setQuotes);

  const quotesToTimelineData: () => Array<TimelineData> = () => {
    const data = quotes.map((quote) => {
      const customContent = (
        <div className="d-flex align-items-center">
          <img className="me-1" src={pdf} alt="pdf" height="24" />
          <span>invoice.pdf</span>
        </div>
      );
      return {
        title: quote.title,
        content: quote.description,
        meta: quote.updatedAt,
        color: 'primary',
        customContent,
      };
    });

    return data;
  };
  return (
    <>
      <Row className="h-100">
        <Col xl="8" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <div className="d-flex flex-column align-content-start">
                <CardTitle tag="h4">{i18n.t('OPP.QUOTE_DETAIL_CARD_TITLE')}</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mt-2" />
            </CardBody>
          </Card>
        </Col>
        <Col xl="4" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <div className="d-flex flex-column align-content-start">
                <CardTitle tag="h4">{i18n.t('OPP.QUOTES_LIST_CARD_TITLE')}</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mt-2">
                <Timeline data={quotesToTimelineData()} className="quotes-list" />
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>
    </>
  );
};

export default QuotesTabContent;
