import React from 'react';
import { useLocation } from 'react-router-dom';

// A custom hook that builds on useLocation to parse
export default function useQueryParams() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
