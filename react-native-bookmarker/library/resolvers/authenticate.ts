import * as yup from 'yup';
import type { LoginFormValues } from '../@types/control';
import { yupResolver } from '@hookform/resolvers/yup';

const emailScheme = yup.object().shape({
   email: yup.string().required().email('Please provide a valid email'),
});

const loginScheme: yup.ObjectSchema<LoginFormValues> = yup.object().shape({
   email: yup.string().required().email('Please provide a valid email'),
   password: yup.string().required(),
});

interface Login extends yup.InferType<typeof loginScheme> {}

const signUpScheme = yup.object().shape({
   email: yup.string().email('Please provide a valid email').min(5, undefined).required(),
   name: yup.string().nullable(),
   password: yup
      .string()
      .min(7, 'The password must contain at least 7 characters')
      .max(30, 'The password cannot contain more than 30 characters')
      .required(),
});

export const signupResolver = yupResolver(signUpScheme);
export const loginResolver = yupResolver(loginScheme);
export const emailResolver = yupResolver(emailScheme);
export type { Login };
