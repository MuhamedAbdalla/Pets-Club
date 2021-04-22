import crypto from 'crypto';

export const generateRandomString = (len: number) : string  =>  {
    return crypto.randomBytes(len).toString('hex');
}