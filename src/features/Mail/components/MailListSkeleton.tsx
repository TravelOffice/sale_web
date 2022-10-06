import { numberArrayOf } from '@utils/ArrayUtils';
import Skeleton from 'react-loading-skeleton';
import React from 'react';

export default function MailListSkeleton() {
  return (
    <ul className="email-media-list">
      {
        numberArrayOf(5).map((i) => (
          <li key={i} className="user-mail">
            <Skeleton count={2} />
          </li>
        ))
      }
    </ul>
  );
}
