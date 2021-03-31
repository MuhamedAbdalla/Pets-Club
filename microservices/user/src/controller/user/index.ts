import { makeExpressCallback } from '../express-callback';
import { buildAddUser } from './build-add-user';

export * from './build-add-user';
export const addUser = makeExpressCallback(buildAddUser());