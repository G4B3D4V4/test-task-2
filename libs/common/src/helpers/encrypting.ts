import { BinaryToTextEncoding, createHash, pbkdf2 } from 'crypto';
import { promisify } from 'util';

export const passwordHash = async (password: string) => {
  const salt = process.env.ENCRYPT_SALT;
  const iterations = Number(process.env.ENCRYPT_ITERATIONS);
  const keylen = Number(process.env.ENCRYPT_KEYLEN);
  const digest = process.env.ENCRYPT_DIGEST;
  const encoding = process.env.ENCRYPT_ENCODING as BufferEncoding;

  const hash = await promisify(pbkdf2)(password, salt, iterations, keylen, digest);
  return hash.toString(encoding);
};

export const hash = data => {
  const alg = process.env.HASH_ALG;
  const encoding = process.env.HASH_ENCODING as BinaryToTextEncoding;
  return createHash(alg).update(data).digest(encoding);
};
