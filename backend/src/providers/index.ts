import Md5PasswordProvider from './implementations/Md5PasswordProvider';
import JwtTokenProvider from './implementations/JwtTokenProvider';
import ZodAccessValidatorProvider from './implementations/ZodAccessValidatorProvider';

export const md5PasswordProvider = new Md5PasswordProvider();

export const jwtTokenProvider = new JwtTokenProvider();

export const zodAccessValidatorProvider = new ZodAccessValidatorProvider();
