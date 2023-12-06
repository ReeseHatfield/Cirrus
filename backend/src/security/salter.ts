import crypto from 'crypto';

const genSalt = (numBytes: number) => {
    return crypto.randomBytes(numBytes).toString('base64');
}
export default genSalt;