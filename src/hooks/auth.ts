import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

export function useIsLoggedIn() {
  return useSelector((state: RootState) => !!state.auth.session);
}

export function useCurrentUser() {
  return useSelector((state: RootState) => state.auth.currentUser);
}
