export * as USER from './user';
export * as AUTH from './auth';

export const TYPE_JSON = 'json';
export const PORT = 3000;
export const ABS_ENDPOINT_REGISTER = '/register';
export const ABS_ENDPOINT_LOGIN = '/login';

export const EXCEPTION_MESSAGE_MISSING_PARAMETER = (parameter: string) => `THE REQUEST IS MISSING '${parameter}' PARAMETER`;