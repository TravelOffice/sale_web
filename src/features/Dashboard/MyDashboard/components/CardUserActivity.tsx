// ** Custom Components
import Timeline from '@components/Timeline';
import Avatar from '@components/Avatar/Avatar';

// ** Reactstrap Imports
import {
  Button, Card, CardBody, CardHeader, CardTitle,
} from 'reactstrap';

// ** Timeline Data
import React, { Fragment } from 'react';
import { MessageSquare, PhoneCall } from 'react-feather';
import pdf from '@assets/images/icons/types/pdf.png';
import ceo from '@assets/images/portrait/small/avatar-s-3.jpg';
import interview from '@assets/images/portrait/small/avatar-s-26.jpg';
import i18n from 'i18next';

export const data = [
  {
    title: 'Thêm phiếu chi',
    content: 'Thêm phiếu chi cho nhà cung cấp quán Bia Quý Cháy',
    meta: '12 min ago',
    customContent: (
      <>
        <div className="d-flex justify-content-between flex-wrap mb-1">
          <div className="d-flex align-items-center">
            <img className="me-1" src={pdf} alt="pdf" height="23" />
            <span>invoice.pdf</span>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <Button size="sm" color="primary" id="reportToggler" outline>
              {i18n.t('DASHBOARD.VIEW_DETAIL')}
            </Button>
          </div>
        </div>
      </>
    ),
  },
  {
    title: 'Phân công xử lý Lead',
    content: 'Thêm người xử lý cho Lead #1163',
    meta: i18n.t('DASHBOARD.MIN_AGO', { minutes: 45 }),
    color: 'secondary',
    customContent: (
      <>
        <div className="d-flex align-items-center mb-1">
          <Avatar img={ceo} imgHeight="38" imgWidth="38" />
          <div className="ms-50">
            <h6 className="mb-0">Nguyễn Thanh An</h6>
            <span>Nhân viên sale</span>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <Button size="sm" color="primary" id="reportToggler" outline>
              {i18n.t('DASHBOARD.VIEW_DETAIL')}
            </Button>
          </div>
        </div>
      </>
    ),
  },
  {
    title: 'Tạo Lead',
    content: 'Đã tạo Lead với mã #1163',
    meta: i18n.t('DASHBOARD.HOURS_AGO', { hours: 2 }),
    color: 'success',
    customContent: (
      <>
        <Button size="sm" color="primary" id="reportToggler" outline>
          {i18n.t('DASHBOARD.VIEW_DETAIL')}
        </Button>
      </>
    ),
  },
  {
    title: 'Tạo Booking',
    content: 'Đã tạo booking với mã #676',
    meta: '03:00 PM',
    color: 'warning',
    customContent: (
      <>
        <hr />
        <div className="d-flex justify-content-between flex-wrap mb-1">
          <div className="d-flex align-items-center">
            <Avatar img={interview} className="me-1" />
            <div>
              <h6 className="mb-0">Khách hàng Lê Hải Yến</h6>
              <span className="text-muted">Số điện thoại: 0123.567.890</span>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center cursor-pointer mt-sm-0 mt-50">
            <MessageSquare className="me-50" size={14} />
            <PhoneCall size={14} />
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <Button size="sm" color="primary" id="reportToggler" outline>
              {i18n.t('DASHBOARD.VIEW_DETAIL')}
            </Button>
          </div>
        </div>
      </>
    ),
  },
];

const CardUserActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">{i18n.t('DASHBOARD.MY_ACTIVITIES')}</CardTitle>
    </CardHeader>
    <CardBody>
      <Timeline data={data} className="user-activity" />
    </CardBody>
  </Card>
);

export default CardUserActivity;
