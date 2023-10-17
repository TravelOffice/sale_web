import React from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Col, Row,
} from 'reactstrap';
import Chart from 'react-apexcharts';
import i18n from 'i18next';

export function getPreviousDay(date: Date, time: number) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - time);
  return previous;
}

function ChatSummary() {
  const date = new Date(Date.now());

  const series = [
    {
      name: 'Facebook',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Zalo',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Telegram',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];
  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        getPreviousDay(date, 8).toLocaleDateString('en-GB'),
        getPreviousDay(date, 7).toLocaleDateString('en-GB'),
        getPreviousDay(date, 6).toLocaleDateString('en-GB'),
        getPreviousDay(date, 5).toLocaleDateString('en-GB'),
        getPreviousDay(date, 4).toLocaleDateString('en-GB'),
        getPreviousDay(date, 3).toLocaleDateString('en-GB'),
        getPreviousDay(date, 2).toLocaleDateString('en-GB'),
        getPreviousDay(date, 1).toLocaleDateString('en-GB'),
        getPreviousDay(date, 0).toLocaleDateString('en-GB'),
      ],
    },
    yaxis: {
      title: {
        text: 'Số lượng',
      },
    },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return "$ " + val + " thousands";
    //     },
    //   },
    // },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Tổng số cuộc chat trên các kênh</CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options as any}
          series={series}
          type="bar"
          height={350}
        />
        {/* Remove the below code block when the feature is ready */}
        <Row>
          <Col lg="12" md="12" sm="12">
            {i18n.t('DASHBOARD.THIS_FEATURES_IS_CURRENTLY_UNDER_DEVELOPMENT')}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default ChatSummary;
