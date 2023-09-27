// ** Third Party Components
import { MoreVertical } from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import React from 'react';
import i18n from 'i18next';

const CardHighestProfitTopTour = () => {
  const statesArr = [
    {
      avatar: 'https://static.vinwonders.com/2022/05/vinpearl-phu-quoc-co-may-khu-11.jpeg',
      title: 'Tour du lịch Phú Quốc',
      value: '15.000.000 VND',
    },
    {
      avatar: 'https://static.vinwonders.com/2022/11/tour-du-lich-la-gi-8.jpg',
      title: 'Tour du lịch Nha Trang',
      value: '13.000.000 VND',
    },
    {
      avatar: 'https://static.vinwonders.com/2022/07/bai-bien-da-nang-1-1.jpg',
      title: 'Tour du lịch Đà Nẵng',
      value: '11.000.000 VND',
    },
    {
      avatar: 'https://static.vinwonders.com/2022/11/tour-du-lich-la-gi-10.jpg',
      title: ' Tour du lịch Hội An',
      value: '10.000.000 VND',
    },
    {
      avatar: 'https://statics.vinpearl.com/chi-phi-du-lich-ha-long-1%20(1)_1629694623.jpg',
      title: 'Tour du lịch Hạ Long',
      value: '9.600.000 VND',
    },
  ];

  const renderStates = () => statesArr.map((state) => (
    <div key={state.title} className="browser-states">
      <div className="d-flex">
        <img className="rounded me-1" src={state.avatar} height="50" alt={state.title} />
        <h6 className="align-self-center mb-0">{state.title}</h6>
      </div>
      <div className="d-flex align-items-center">
        <div className="fw-bolder text-success">{state.value}</div>
      </div>
    </div>
  ));

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">{i18n.t('DASHBOARD.HIGHEST_PROFIT_TOURS')}</CardTitle>
          <CardText className="font-small-2">25/09/2023 - 01/10/2023</CardText>
        </div>
        <UncontrolledDropdown className="chart-dropdown">
          <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
            <MoreVertical size={18} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem className="w-100">Last Week</DropdownItem>
            <DropdownItem className="w-100">Last Month</DropdownItem>
            <DropdownItem className="w-100">Last Year</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  );
};

export default CardHighestProfitTopTour;
