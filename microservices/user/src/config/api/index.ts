export * as USER from './user'

export const TYPE_JSON = 'json';
export const PORT = 3000;
export const ACCESS_TOKEN = 'authorization';
export const EXCEPTION_MESSAGE_TOKEN_NOT_EXISTS = 'TOKEN';
export const ABS_ENDPOINT_REGISTER = '/register';

export const EXCEPTION_MESSAGE_MISSING_PARAMETER = (parameter: string) => `THE REQUEST IS MISSING '${parameter}' PARAMETER`;