import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { AuthStateType } from '@redux/slices/authSlice';

export function useIsLoggedIn() {
  return useSelector((state: RootState) => state.auth.authStateType === AuthStateType.LoggedIn);
}

export function useCurrentUser() {
  return useSelector((state: RootState) => state.auth.currentUser);
}
