import { leadPresenter } from '@adapter/presenters';
import toasty from '@components/Toasty/Toasty';
import i18n from '@config/i18n';
import {
  Lead, LeadStatusType, Task, TaskSearchParams,
} from '@domain/entities/Lead';
import { leadActions } from '@redux/slices/leadSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';

function* getAllLeads(action: PayloadAction<LeadStatusType>) {
  try {
    const leads : Lead[] = yield call(leadPresenter.getAllLeads, action.payload);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
    yield put(leadActions.setFetchAllLeadError());
  }
}

function* getLead(action: PayloadAction<string>) {
  const leadId: string = action.payload;
  const lead : Lead = yield call(leadPresenter.getLead, leadId);
  yield put(leadActions.selectLead(lead));
}

function* addLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const addedLead : Lead = yield call(leadPresenter.addLead, lead);
    yield put(leadActions.onLeadAdded(addedLead));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('LEAD.ADD_LEAD_SUCCESSFULLY', { leadName: addedLead.name }),
    });
    // Re-fetch all leads
    const leads : Lead[] = yield call(leadPresenter.getAllLeads);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
  }
}

function* updateLead(action: PayloadAction<Lead>) {
  try {
    const lead: Lead = action.payload;
    const updatedLead : Lead = yield call(leadPresenter.updateLead, lead);
    yield put(leadActions.onLeadUpdated(updatedLead));
    toasty.show({
      title: i18n.t('COMMON.SUCCESS'),
      type: 'success',
      message: i18n.t('LEAD.EDIT_LEAD_SUCCESSFULLY', { leadName: updatedLead.name }),
    });
    // Re-fetch all leads
    const leads : Lead[] = yield call(leadPresenter.getAllLeads);
    yield put(leadActions.setAllLeads(leads));
  } catch (error: any) {
    toasty.show({
      title: i18n.t('COMMON.ERROR'),
      type: 'error',
      message: `${error.message}`,
    });
  }
}

function* getAllTasks(action: PayloadAction<TaskSearchParams>) {
  const param: TaskSearchParams = action.payload;
  console.log('getAllTasks ', param);
  // const tasks : Task[] = yield call(leadPresenter.getLead, leadId);
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Entire change break our wife wide it daughter mention member.',
      dueDate: '2020-11-25',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['update'],
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 2,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 3,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 4,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 5,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 6,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 7,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 8,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 9,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 10,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 11,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 12,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 13,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 14,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 15,
      title: 'Citizen stand administration step agency century.',
      dueDate: '2020-12-14',
      description:
        'Chocolate cake topping bonbon jujubes donut sweet wafer. Marzipan gingerbread powder brownie bear claw. Chocolate bonbon sesame snaps jelly caramels oat cake.',
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
    },
  ];
  yield put(leadActions.setAllTasks(tasks));
}

export default function* leadSaga() {
  yield all([
    takeLatest(leadActions.getAllLeads, getAllLeads),
    takeLatest(leadActions.getAllTasks, getAllTasks),
    takeLatest(leadActions.getLead, getLead),
    takeLatest(leadActions.addLead, addLead),
    takeLatest(leadActions.updateLead, updateLead),
  ]);
}
