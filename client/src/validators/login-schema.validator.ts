import * as yup from "yup";

export const loginSchema = yup.object().shape({
  emailId: yup.string().email("Invalid credentials").required(),
  password: yup.string().required(),
});
