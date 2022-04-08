import { apiProvider } from '@adapter/infrastructures';
import { Lead } from '@domain/entities/Lead';
import { LeadRepository } from './interfaces/LeadRepository';

export default class LeadRepositoryImpl implements LeadRepository {
  getAllLeads = async () => {
    const leads: Lead[] = [
      {
        name: 'Nguyen TUn aNH',
        primaryPhoneNumber: '0348529905',
        creatorName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'Vietnamese',
        status: 'NEW',
        creatorId: 'e',
        sex: 'FEMALE',
        assigneeId: 'dsf',
        otherPhoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'VN',
        enabled: true,
        maritalStatus: 'MARRIED',
        province: 'df',
        tags: [
          '65',
        ],
        birthday: '1999-11-31',
        type: 'LEAD',
      },
      {
        name: 'Nguyen TUn aNH',
        primaryPhoneNumber: '0348529905',
        creatorName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'Vietnamese',
        status: 'NEW',
        creatorId: 'e',
        sex: 'MALE',
        assigneeId: 'dsf',
        otherPhoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'VN',
        enabled: true,
        maritalStatus: 'MARRIED',
        province: 'df',
        tags: [
          '65',
        ],
        birthday: '1999-11-31',
        type: 'LEAD',
      },
      {
        name: 'Nguyen TUn aNH',
        primaryPhoneNumber: '0348529905',
        creatorName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'Vietnamese',
        status: 'NEW',
        creatorId: 'e',
        sex: 'MALE',
        assigneeId: 'dsf',
        otherPhoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'VN',
        enabled: true,
        maritalStatus: 'MARRIED',
        province: 'df',
        tags: [
          '65',
        ],
        birthday: '1999-11-31',
        type: 'LEAD',
      },
      {
        name: 'Nguyen TUn aNH',
        primaryPhoneNumber: '0348529905',
        creatorName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'Vietnamese',
        status: 'NEW',
        creatorId: 'e',
        sex: 'MALE',
        assigneeId: 'dsf',
        otherPhoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'VN',
        enabled: true,
        maritalStatus: 'MARRIED',
        province: 'df',
        tags: [
          '65',
        ],
        birthday: '1999-11-31',
        type: 'LEAD',
      },
    ];
    return leads;
  }

  addLead = async (lead: Lead) => {
    const response = await apiProvider.authorizedRequest.post('/leads', lead);
    if (response.message !== 'Successfully!') {
      throw Error('Create Lead error');
    }
    return lead;
  }

  updateLead = async (lead: Lead) => {
    const response = await apiProvider.authorizedRequest.put('/leads', lead);
    if (response.message !== 'Successfully!') {
      throw Error('Update Lead error');
    }
    return lead;
  }
}
