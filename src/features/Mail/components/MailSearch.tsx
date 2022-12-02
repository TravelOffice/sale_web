import React, { ChangeEvent, useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mailPresenter } from '@adapter/presenters';
import { useSelectedMailAccount } from '@hooks/mail';
import MailListSkeleton from '@features/Mail/components/MailListSkeleton';
import EmptyMailList from '@features/Mail/components/EmptyMailList';
import ErrorMailList from '@features/Mail/components/ErrorMailList';
import MailResultItem from '@features/Mail/components/MailResultItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Input, Label } from 'reactstrap';
import { MailSearchResult } from '@domain/entities/mail/MailSearchResult';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { mailActions } from '@redux/slices/mailSlice';
import { useDebounce } from '@hooks/common';
import DeleteMailButton from '@features/Mail/components/DeleteMailButton';

export interface MailSearchProps {
  query: string,
}

export default function MailSearch(props: MailSearchProps) {
  const { query } = props;
  const [selectedResults, setSelectedResults] = useState<MailSearchResult[]>([]);
  const debouncedSearchQuery = useDebounce(query, 600);
  const mailAccount = useSelectedMailAccount();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery(['mailSearch', debouncedSearchQuery], () => mailPresenter.search(mailAccount!, debouncedSearchQuery), { enabled: !!mailAccount });
  // Select all search results
  const onSelectAll = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && data) {
      setSelectedResults(data);
    } else {
      setSelectedResults([]);
    }
  }, [data]);

  // Select/unselected a message
  const onResultSelected = (result: MailSearchResult, selected: boolean) => {
    if (selected) {
      // Add to selected list
      setSelectedResults([...selectedResults, result]);
    } else {
      // Remove to selected list
      setSelectedResults(selectedResults.filter((selectedMail) => selectedMail !== result));
    }
  };

  const renderList = useCallback(() => {
    // Render fetching UI
    if (isLoading) {
      return <MailListSkeleton />;
    }

    // Render error UI
    if (isError) {
      return <ErrorMailList onReload={() => queryClient.invalidateQueries(['mailSearch'])} />;
    }

    const results = data!;
    // Render empty results
    if (results.length === 0) {
      return <EmptyMailList />;
    }

    // Render mail list UI
    return (
      <ul className="email-media-list search-results">
        {
          results.map((result) => (
            <MailResultItem
              key={result.messageId}
              result={result}
              onMailClicked={() => dispatch(mailActions.selectMailResult(result))}
              onMailSelected={onResultSelected}
              isSelected={selectedResults.includes(result)}
            />
          ))
        }
      </ul>
    );
  }, [isLoading, isError, data, selectedResults]);

  // Render results
  return (
    <>
      <div className="app-action">
        <div className="action-left form-check">
          <Input
            type="checkbox"
            id="select-all"
            onChange={onSelectAll}
            checked={selectedResults.length > 0 && data && selectedResults.length === data.length}
          />
          <Label className="form-check-label fw-bolder ps-25 mb-0" for="select-all">
            {t('COMMON.SELECT_ALL')}
          </Label>
        </div>
        {selectedResults.length > 0 && (
          <div className="action-right">
            <ul className="list-inline m-0">
              <li className="list-inline-item">
                <DeleteMailButton
                  mails={selectedResults}
                  callback={() => { setSelectedResults([]); }}
                />
              </li>
            </ul>
          </div>
        )}
      </div>
      <PerfectScrollbar className="email-user-list">
        {renderList()}
      </PerfectScrollbar>
    </>
  );
}
