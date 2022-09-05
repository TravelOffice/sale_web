import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';

// eslint-disable-next-line import/prefer-default-export
export const useLocationPath = () => useSelector((
  (state: RootState) => state.router.location.pathname
));
