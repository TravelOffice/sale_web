import { Lead } from '@domain/entities/Lead';
import Images from '@themes/Images';
import { LeadRepository } from './interfaces/LeadRepository';

export default class LeadRepositoryImpl implements LeadRepository {
  getAllLeads = async () => {
    const leads: Lead[] = [
      {
        name: 'Nguyen TUn aNH',
        primaryPhoneNumber: 'sadhsadjej',
        createrName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'VietNam',
        status: 'NEW',
        createrId: 'e',
        sex: 'MALE',
        assigneeId: 'dsf',
        phoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'AB',
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
        primaryPhoneNumber: 'sadhsadjej',
        createrName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'VietNam',
        status: 'NEW',
        createrId: 'e',
        sex: 'MALE',
        assigneeId: 'dsf',
        phoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'AB',
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
        primaryPhoneNumber: 'sadhsadjej',
        createrName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'VietNam',
        status: 'NEW',
        createrId: 'e',
        sex: 'MALE',
        assigneeId: 'dsf',
        phoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'AB',
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
        primaryPhoneNumber: 'sadhsadjej',
        createrName: 'w',
        vocative: 'MR_YOUNG',
        nationality: 'VietNam',
        status: 'NEW',
        createrId: 'e',
        sex: 'MALE',
        assigneeId: 'dsf',
        phoneNumbers: [
          '0348529905',
          '0348529902',
        ],
        assigneeName: 'ds',
        source: 'SOCIAL',
        email: '1@gmail.com',
        country: 'AB',
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
}
