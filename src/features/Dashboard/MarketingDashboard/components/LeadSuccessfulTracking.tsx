import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import Chart from 'react-apexcharts';

function LeadSuccessfulTracking() {
  const series = [
    {
      name: 'Inflation',
      data: [9.1, 3.1, 4.0, 10.1, 18.0, 13.6, 3.2, 7.3, 1.4, 0.8, 0, 0],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val: string) {
        return `${val}%`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter(val: string) {
          return `${val}%`;
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <Col md="11" xs="12">
          <CardTitle tag="h4">Tỉ lệ Lead đạt theo tháng</CardTitle>
        </Col>
        <Col md="1" xs="12">
          <UncontrolledButtonDropdown>
            <DropdownToggle style={{ width: '100%' }} className="budget-dropdown" outline color="primary" size="sm" caret>
              Tháng
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="w-100">
                Tháng
              </DropdownItem>
              <DropdownItem className="w-100">
                Tuần
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Col>
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options as any}
          series={series}
          type="bar"
          height={350}
        />
      </CardBody>
    </Card>
  );
}

export default LeadSuccessfulTracking;
