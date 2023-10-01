// ** Icons Imports
import { MoreVertical } from 'react-feather';

// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  UncontrolledDropdown,
} from 'reactstrap';
import React from 'react';
import i18n from 'i18next';

const MyTasks = () => {
  const dataArr = [
    {
      id: 'task1',
      title: 'Lập báo cáo tuần 1 tháng 10',
      badgeColor: 'light-success',
      status: i18n.t('DASHBOARD.COMPLETED'),
    },
    {
      id: 'task2',
      title: 'Kiểm tra thông tin hành khách tour 102',
      badgeColor: 'light-primary',
      status: i18n.t('DASHBOARD.UNCOMPLETED'),
      checked: true,
    },
    {
      id: 'task3',
      title: 'Chăm sóc khách hàng cũ (xem trong danh sách đính kèm)',
      badgeColor: 'light-success',
      status: i18n.t('DASHBOARD.COMPLETED'),
    },
    {
      id: 'task4',
      title: 'Chuẩn bị thông tin cho buổi họp với đối tác',
      badgeColor: 'light-success',
      status: i18n.t('DASHBOARD.COMPLETED'),
    },
  ];

  const renderOptions = () => dataArr.map((item) => (
    <div key={item.id} className="business-item">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-check">
          <Input id={item.id} type="checkbox" label={item.id} defaultChecked={item.checked} />
          <Label className="form-check-label" for={item.id}>
            {item.title}
          </Label>
        </div>
        <Badge color={item.badgeColor}>{item.status}</Badge>
      </div>
    </div>
  ));

  return (
    <Card className="business-card">
      <CardHeader className="pb-1">
        <CardTitle tag="h4">{i18n.t('DASHBOARD.YOUR_TASKS')}</CardTitle>
        <UncontrolledDropdown>
          <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
            <MoreVertical size={18} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem className="w-100">{i18n.t('DASHBOARD.MARK_AS_COMPLETED')}</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <div className="business-items">{renderOptions()}</div>
        <Button color="primary" block>
          {i18n.t('DASHBOARD.GO_TO_TASK_MANAGEMENT_PAGE')}
        </Button>
      </CardBody>
    </Card>
  );
};

export default MyTasks;
