import React, { useState } from 'react';
import { Menu, Search } from 'react-feather';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import MailDetailContainer from '@features/Mail/components/MailDetailContainer';
import MailList from '@features/Mail/components/MailList';
import MailSearch from '@features/Mail/components/MailSearch';
import MailSearchResultDetailContainer from '@features/Mail/components/MailSearchResultDetailContainer';

export interface AppMailContentProps {
  onMenuClick: () => void,
}

export default function AppMailContent(props: AppMailContentProps) {
  const [query, setQuery] = useState('');
  const { onMenuClick } = props;
  const { t } = useTranslation();
  return (
    <>
      <div className="email-app-list">
        <div className="app-fixed-search d-flex align-items-center">
          <div className="sidebar-toggle d-block d-lg-none ms-1" onClick={onMenuClick}>
            <Menu size="21" />
          </div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="email-search"
                placeholder={t('MAIL.SEARCH_EMAIL')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        {
          query.trim().length === 0
            ? <MailList />
            : <MailSearch query={query} />
        }
      </div>
      <MailDetailContainer />
      <MailSearchResultDetailContainer />
    </>
  );
}
