import { RootState } from '../../store';

export const userAuthSelector = (state: RootState) => !!state.user.data.username;
export const userLoadingSelector = (state: RootState) => state.user.status === 'pending';
export const userErrorSelector = (state: RootState) => state.user.status === 'failed';
export const userValidationSelector = (state: RootState) => state.user.errorMessage;
