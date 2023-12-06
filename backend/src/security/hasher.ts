import crypto from 'crypto';
import genSalt from './salter';

const hash = (plaintext: string) => {
    plaintext = plaintext.trim();
    const rawSalt: string = genSalt(8);

    const hashMe = rawSalt + plaintext;
    const hash: string = crypto.createHash('sha256').update(hashMe).digest('hex');

    return hash;
}


export default hash;