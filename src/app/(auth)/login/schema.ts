import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  rememberMe: yup.boolean(),
});

export const defaultValues = {
    email: '',
    password: '',
    rememberMe: false,
};