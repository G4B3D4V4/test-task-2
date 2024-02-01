import { IS_DEV } from './general.constants';
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: IS_DEV ? '1y' : '1h',
};
