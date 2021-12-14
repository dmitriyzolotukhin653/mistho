export interface IUserState {
  status: Status;
  data: IUser;
  errorMessage: string | IValidationError;
}

export interface IUser {
  email: string;
  password: string;
  username: string;
  password2?: string;
}

type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

export type RequestUser = {
  user: IUser;
  type: RequestUserType;
};

export enum RequestUserType {
  LOGIN = 'login',
  SIGNUP = 'register',
  DEFAULT = '',
}

export type IValidationError = {
  [index in 'email' | 'username' | 'password']: string;
};
